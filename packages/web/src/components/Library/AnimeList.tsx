import NextLink from 'next/link';
import React from 'react';
import { Waypoint } from 'react-waypoint';

import { Box, Button, Grid, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { Media, useUserAnimeListQuery } from '@koi/controller';

import { Poster } from '../Media/Poster';
import { Loader } from '../UI/Loader';
import { SearchBar } from './SearchBar';

interface AnimeListProps {
	username: string;
}

export const AnimeList: React.FC<AnimeListProps> = ({ username }) => {
	const { data, loading, fetchMore, variables } = useUserAnimeListQuery({
		variables: {
			options: {
				limit: 20,
				media: Media.Anime,
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
							<NextLink href="/browse/anime">
								<a>
									<Button colorScheme="teal">Browse Anime</Button>
								</a>
							</NextLink>
						</Stack>
					</Box>
				) : (
					<>
						<Grid templateColumns="repeat(5, 1fr)" gap={3}>
							{data.userList.items.map((x) => (
								<React.Fragment key={x.anime?.id}>
									{x.anime && (
										<Poster
											url={`/anime/${x.anime.slug}`}
											title={x.anime.canonicalTitle}
											posterSrc={x.anime.posterLinkSmall}
											synopsis={x.anime.synopsis}
											date={x.anime.startDate.substring(
												0,
												x.anime.startDate.indexOf('-')
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
