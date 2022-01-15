import NextLink from 'next/link';
import React from 'react';
import { Waypoint } from 'react-waypoint';

import {
	Box,
	Button,
	Grid,
	Heading,
	Skeleton,
	Stack,
	useColorMode,
} from '@chakra-ui/react';
import {
	Direction,
	getPreferredName,
	ListStatus,
	Media,
	SortBy,
	useUserAnimeListQuery,
} from '@koi/controller';

import { Poster } from '../Media/Poster';
import { Loader } from '../UI/Loader';
import { ProgressStepper } from './ProgressStepper';

interface AnimeListProps {
	username: string;
	title: string;
	sort: SortBy;
	direction: Direction;
	status: ListStatus | null;
}

export const AnimeList: React.FC<AnimeListProps> = ({
	username,
	title,
	sort,
	status,
	direction,
}) => {
	const { colorMode } = useColorMode();
	const { data, loading, fetchMore, variables } = useUserAnimeListQuery({
		variables: {
			options: {
				limit: 20,
				media: Media.Anime,
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
					<Box
						bg={colorMode === 'dark' ? 'gray.700' : 'white'}
						p={5}
						borderRadius={3}
					>
						{title ? (
							<Heading textAlign="center" fontSize="lg" color="gray.500">
								Couldn&apos;t find any library entries with your search query.
							</Heading>
						) : (
							<Stack align="center" justify="space-between" spacing={5}>
								<Heading fontSize="lg" color="gray.500">
									Looks like your library here is empty! Ready to start
									something new?
								</Heading>
								<NextLink href="/browse/anime">
									<a>
										<Button colorScheme="teal">Browse Anime</Button>
									</a>
								</NextLink>
							</Stack>
						)}
					</Box>
				) : (
					<>
						<Grid templateColumns="repeat(5, 1fr)" gap={3}>
							{data.userList.items.map((x) => (
								<React.Fragment key={x.anime?.id}>
									{x.anime && (
										<Stack bg="pink.900" spacing={0} borderRadius={6}>
											<Poster
												url={`/anime/${x.anime.slug}`}
												title={getPreferredName(
													x.anime.englishTitle,
													x.anime.japaneseTitle,
													x.anime.romajiTitle,
													x.anime.canonicalTitle
												)}
												rank={x.anime.rank}
												posterSrc={x.anime.posterLinkSmall}
												listStatus={x.status}
												synopsis={x.anime.synopsis}
												date={x.anime.startDate.substring(
													0,
													x.anime.startDate.indexOf('-')
												)}
												fallback={<Skeleton h={64} w={166} />}
												topRadiusOnly
											/>
											<ProgressStepper
												count={x.currentEpisode}
												total={x.anime.episodeCount}
												type={Media.Anime}
												username={username}
												slug={x.anime.slug}
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
													media: Media.Anime,
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
