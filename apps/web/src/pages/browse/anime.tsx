import { NextSeo } from 'next-seo';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { Waypoint } from 'react-waypoint';

import {
	Box,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@chakra-ui/react';
import {
	useDebounce,
	useSearchAnimeQuery,
	getPreferredName,
} from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { Poster } from '../../components/Media/Poster';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { isServer } from '../../utils/isServer';

import type { NextPage } from 'next';
export const BrowseAnime: NextPage = ({}) => {
	const [searchStr, setSearchStr] = useState('');
	const { data, loading, refetch, fetchMore, variables } = useSearchAnimeQuery({
		variables: {
			cursor: 0,
			limit: 20,
			filter: searchStr,
		},
		skip: isServer(),
	});

	useDebounce(
		() => {
			refetch();
		},
		500,
		[searchStr]
	);

	if (loading) {
		return (
			<Layout>
				<Loader size="xl" />
			</Layout>
		);
	}

	return (
		<Layout variant="full">
			<NextSeo
				title="Browse Anime - Koi Anime"
				description="A short description goes here."
			/>
			<Stack alignItems="center">
				<Box w={[300, 420, 700, 1000]} pb={5}>
					<Box textAlign="left" w="100%">
						<Heading pb={1}>Explore Anime</Heading>
						<InputGroup pb={6}>
							<InputLeftElement
								pointerEvents="none"
								color="gray.300"
								fontSize="1.5em"
								top={1}
								left={1}
								children={<IoSearch color="gray.300" />}
							/>
							<Input
								placeholder="What are you looking for?"
								size="lg"
								focusBorderColor="teal.400"
								value={searchStr}
								onChange={(e) => setSearchStr(e.target.value)}
							/>
						</InputGroup>
					</Box>
					{!data ? (
						<Loader size="xl" />
					) : (
						<Box pb={5}>
							<SimpleGrid columns={[2, 2, 4, 5]} gap={3}>
								{data.kitsuSearchAnime.items.map((x) => (
									<Poster
										key={x.id}
										url={`/anime/${x.slug}`}
										title={getPreferredName(
											x.englishTitle,
											x.japaneseTitle,
											x.romajiTitle,
											x.canonicalTitle
										)}
										status={x.status}
										posterSrc={x.posterLinkSmall}
										synopsis={x.synopsis}
										rank={x.rank}
										date={x.startDate.substring(0, x.startDate.indexOf('-'))}
									/>
								))}
							</SimpleGrid>
							{data.kitsuSearchAnime.hasMore && (
								<>
									<SimpleGrid columns={[2, 2, 4, 5]} gap={3} pt={3}>
										{[...Array(5)].map((_x, i) => (
											<Skeleton
												key={i}
												h="64"
												w={[144, 200, 166, 190]}
												borderRadius={6}
											/>
										))}
									</SimpleGrid>
									<Waypoint
										onEnter={() => {
											console.log('fetching more...');
											fetchMore({
												variables: {
													limit: variables?.limit ?? 0,
													cursor: data.kitsuSearchAnime.nextCursor,
												},
											});
										}}
									/>
								</>
							)}
						</Box>
					)}
				</Box>
			</Stack>
		</Layout>
	);
};

export default withApollo({ ssr: false })(BrowseAnime);
