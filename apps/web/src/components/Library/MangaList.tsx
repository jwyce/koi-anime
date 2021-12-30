import NextLink from 'next/link';
import React from 'react';
import { Waypoint } from 'react-waypoint';

import { Box, Button, Grid, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { Media, useUserMangaListQuery,  } from '@koi/controller';

import { Poster } from '../Media/Poster';
import { Loader } from '../UI/Loader';
import { SearchBar } from './SearchBar';

interface MangaListProps {
	username: string;
}

export const MangaList: React.FC<MangaListProps> = ({ username }) => {
	const { data, loading, fetchMore, variables } = useUserMangaListQuery({
		variables: {
			options: {
				limit: 20,
				media: Media.Manga,
				username,
			},
		},
		fetchPolicy: 'cache-and-network',
	});
	if (loading || !data) {
		return <Loader size="xl" />;
	}
	return (
		<>
			<SearchBar username={username} />

			<Box pt={3}>
				{data.userList.items.length === 0 ? (
					<Box bg="gray.700" p={5} borderRadius={3}>
						<Stack align="center" justify="space-between" spacing={5}>
							<Heading fontSize="lg" color="gray.500">
								Looks like your library here is empty! Ready to start something
								new?
							</Heading>
							<NextLink href="/browse/manga">
								<a>
									<Button colorScheme="teal">Browse Manga</Button>
								</a>
							</NextLink>
						</Stack>
					</Box>
				) : (
					<>
						<Grid templateColumns="repeat(5, 1fr)" gap={3}>
							{data.userList.items.map((x) => (
								<React.Fragment key={x.manga?.id}>
									{x.manga && (
										<Poster
											url={`/manga/${x.manga.slug}`}
											title={x.manga.canonicalTitle}
											posterSrc={x.manga.posterLinkSmall}
											synopsis={x.manga.synopsis}
											date={x.manga.startDate.substring(
												0,
												x.manga.startDate.indexOf('-')
											)}
										/>
									)}
								</React.Fragment>
							))}
						</Grid>
						{data.userList.hasMore && (
							<>
								<Grid templateColumns="repeat(5, 1fr)" gap={3} pt={3}>
									{[...Array(5)].map((_x, i) => (
										<Skeleton key={i} h="64" w={190} borderRadius={6} />
									))}
								</Grid>
								<Waypoint
									onEnter={() => {
										console.log('fetching more...');
										fetchMore({
											variables: {
												limit: variables?.options.limit ?? 0,
												cursor: data.userList.nextCursor,
											},
										});
									}}
								/>
							</>
						)}
					</>
				)}
			</Box>
		</>
	);
};
