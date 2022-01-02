import NextLink from 'next/link';
import React from 'react';
import { Waypoint } from 'react-waypoint';

import { Box, Button, Grid, Heading, Skeleton, Stack } from '@chakra-ui/react';
import {
	Direction,
	getPreferredName,
	ListStatus,
	Media,
	SortBy,
	useUserMangaListQuery,
} from '@koi/controller';

import { Poster } from '../Media/Poster';
import { Loader } from '../UI/Loader';
import { ProgressStepper } from './ProgressStepper';

interface MangaListProps {
	username: string;
	title: string;
	sort: SortBy;
	direction: Direction;
	status: ListStatus | null;
}

export const MangaList: React.FC<MangaListProps> = ({
	username,
	title,
	sort,
	status,
	direction,
}) => {
	const { data, loading, fetchMore, variables } = useUserMangaListQuery({
		variables: {
			options: {
				limit: 20,
				media: Media.Manga,
				username,
				title,
				sort,
				status,
				direction,
			},
		},
		fetchPolicy: 'network-only',
	});
	if (loading || !data) {
		return <Loader size="xl" />;
	}
	return (
		<Box pb={10}>
			<Box pt={3}>
				{data.userList.items.length === 0 ? (
					<Box bg="gray.700" p={5} borderRadius={3}>
						{title ? (
							<Heading textAlign="center" fontSize="lg" color="gray.500">
								Couldn't find any library entries with your search query.
							</Heading>
						) : (
							<Stack align="center" justify="space-between" spacing={5}>
								<Heading fontSize="lg" color="gray.500">
									Looks like your library here is empty! Ready to start
									something new?
								</Heading>
								<NextLink href="/browse/manga">
									<a>
										<Button colorScheme="teal">Browse Manga</Button>
									</a>
								</NextLink>
							</Stack>
						)}
					</Box>
				) : (
					<>
						<Grid templateColumns="repeat(5, 1fr)" gap={3}>
							{data.userList.items.map((x) => (
								<React.Fragment key={x.manga?.id}>
									{x.manga && (
										<Stack bg="gray.700" spacing={0} borderRadius={6}>
											<Poster
												url={`/manga/${x.manga.slug}`}
												title={getPreferredName(
													x.manga.englishTitle,
													x.manga.japaneseTitle,
													x.manga.romajiTitle,
													x.manga.canonicalTitle
												)}
												rank={x.manga.rank}
												posterSrc={x.manga.posterLinkSmall}
												synopsis={x.manga.synopsis}
												date={x.manga.startDate.substring(
													0,
													x.manga.startDate.indexOf('-')
												)}
												topRadiusOnly
											/>
											<ProgressStepper
												count={x.currentChapter}
												total={x.manga.chapterCount}
												type={Media.Manga}
												username={username}
												slug={x.manga.slug}
												listId={x.id}
											/>
										</Stack>
									)}
								</React.Fragment>
							))}
						</Grid>
						{data.userList.hasMore && (
							<>
								<Grid templateColumns="repeat(5, 1fr)" gap={3} pt={3}>
									{[...Array(5)].map((_x, i) => (
										<Skeleton key={i} h="64" w={166} borderRadius={6} />
									))}
								</Grid>
								<Waypoint
									onEnter={() => {
										console.log('fetching more...');
										fetchMore({
											variables: {
												options: {
													limit: variables?.options.limit ?? 0,
													cursor: data.userList.nextCursor,
													media: Media.Manga,
													username,
													title,
													sort,
													status,
													direction,
												},
											},
										});
									}}
								/>
							</>
						)}
					</>
				)}
			</Box>
		</Box>
	);
};
