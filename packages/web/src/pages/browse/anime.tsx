import NextLink from 'next/link';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { Waypoint } from 'react-waypoint';

import {
	Box,
	Grid,
	Heading,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Skeleton,
	Stack,
} from '@chakra-ui/react';
import { useDebounce, useSearchAnimeQuery } from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { isServer } from '../../utils/isServer';

import type { NextPage } from 'next';
export const BrowseAnime: NextPage = ({}) => {
	// const router = useRouter();
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
		<Layout>
			<Loader size="xl" />
		</Layout>;
	}

	console.log(data?.kitsuSearchAnime);

	return (
		<Layout variant="full">
			<Stack alignItems="center">
				<Box w={1000}>
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
						<Grid templateColumns="repeat(5, 1fr)" gap={3}>
							{data.kitsuSearchAnime.items.map((x, i) => (
								<React.Fragment key={x.id}>
									<NextLink href={`/anime/${x.slug}`}>
										<a>
											<Image
												src={x.posterLinkSmall}
												alt={x.canonicalTitle}
												w={200}
												borderRadius={6}
												fallback={<Skeleton h={80} w={200} />}
											/>
										</a>
									</NextLink>
									{i === data.kitsuSearchAnime.items.length - 2 && (
										<Waypoint
											onEnter={() => {
												console.log('fetching more...');
												if (data.kitsuSearchAnime.hasMore) {
													console.log({
														limit: variables?.limit ?? 0,
														cursor:
															(variables?.cursor ?? 0) +
															(variables?.limit ?? 0) +
															1,
													});
													fetchMore({
														variables: {
															limit: variables?.limit ?? 0,
															cursor:
																(variables?.cursor ?? 0) +
																(variables?.limit ?? 0) +
																1,
														},
														updateQuery: (
															previousResult,
															{ fetchMoreResult }
														) => {
															const newEntries =
																fetchMoreResult?.kitsuSearchAnime.items!;
															return {
																kitsuSearchAnime: {
																	items: [
																		...previousResult.kitsuSearchAnime.items,
																		...newEntries,
																	],
																	hasMore:
																		fetchMoreResult?.kitsuSearchAnime.hasMore!,
																	total:
																		fetchMoreResult?.kitsuSearchAnime.total!,
																},
															};
														},
													});
												}
											}}
										/>
									)}
								</React.Fragment>
								// <Box key={idx}>{x.canonicalTitle}</Box>
							))}
						</Grid>
					)}
				</Box>
			</Stack>
		</Layout>
	);
};

export default withApollo({ ssr: false })(BrowseAnime);
