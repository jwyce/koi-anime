import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Layout } from '@/components/Layout/Layout';
import { Resource } from '@/components/Media/Resource';
import { Loader } from '@/components/UI/Loader';
import { withApollo } from '@/stores/withApollo';
import {
	Box,
	Button,
	Heading,
	HStack,
	Select,
	Stack,
	Text,
} from '@chakra-ui/react';
import {
	ResourceType,
	useGetMatchupQuery,
	useVoteMutation,
} from '@koi/controller';

import type { NextPage } from 'next';
import { NetworkStatus } from '@apollo/client';
export const Vote: NextPage = ({}) => {
	const router = useRouter();
	const { type } = router.query;
	const typeAsEnum = (type as string)?.toUpperCase() as ResourceType;

	const [shouldSkip, setShouldSkip] = useState(true);
	const { data, loading, refetch, networkStatus } = useGetMatchupQuery({
		variables: { type: typeAsEnum },
		skip: shouldSkip,
	});
	const [vote] = useVoteMutation();

	useEffect(() => {
		if (type) {
			setShouldSkip(false);
		}
	}, [type]);

	const types = [
		{ icon: '🎥', status: ResourceType.Anime, text: 'Anime' },
		{ icon: '📙', status: ResourceType.Manga, text: 'Manga' },
		{ icon: '🎵', status: ResourceType.EdSong, text: 'Ending Song' },
		{ icon: '🎶', status: ResourceType.OpSong, text: 'Opening Song' },
		{ icon: '💙', status: ResourceType.MCharacter, text: 'Best Boy' },
		{ icon: '🌸', status: ResourceType.FCharacter, text: 'Best Girl' },
	];

	if (loading && !data) {
		return (
			<Layout>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					h="calc(100vh - 120px)"
					flexDirection="column"
				>
					<Loader size="xl" />
				</Box>
			</Layout>
		);
	}

	return (
		<Layout>
			<NextSeo
				title="Vote - Koi Anime"
				description="A short description goes here."
			/>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				h="calc(100vh - 120px)"
				flexDirection="column"
			>
				<Heading textAlign="center" pb={5}>
					Which is better?
				</Heading>
				{loading || networkStatus === NetworkStatus.refetch ? (
					<Loader size="lg" />
				) : (
					<>
						{data && data.getMatchup ? (
							<>
								<HStack align="center" justify="space-evenly" w="100%">
									<Resource
										imageSrc={data.getMatchup.first.imageUrl}
										name={data.getMatchup.first.name}
										isSong={
											typeAsEnum === ResourceType.EdSong ||
											typeAsEnum === ResourceType.OpSong
										}
										callback={async () => {
											await vote({
												variables: {
													type: typeAsEnum,
													votedAgainst: data.getMatchup?.second.slug ?? '',
													votedFor: data.getMatchup?.first.slug ?? '',
												},
											});
											refetch();
										}}
									/>
									<Text fontSize="xl" fontStyle="italic">
										or
									</Text>
									<Resource
										imageSrc={data.getMatchup.second.imageUrl}
										name={data.getMatchup.second.name}
										isSong={
											typeAsEnum === ResourceType.EdSong ||
											typeAsEnum === ResourceType.OpSong
										}
										callback={async () => {
											await vote({
												variables: {
													type: typeAsEnum,
													votedAgainst: data.getMatchup?.first.slug ?? '',
													votedFor: data.getMatchup?.second.slug ?? '',
												},
											});
											refetch();
										}}
									/>
								</HStack>
							</>
						) : (
							<Stack
								p={10}
								bg="gray.700"
								align="center"
								justify="center"
								spacing={1}
							>
								<Text fontSize="larger" fontWeight={700} color="gray.500">
									Not enough media in your list to vote! Ready to start
									something new?
								</Text>
								<NextLink href="/browse/anime">
									<a>
										<Button colorScheme="teal">Browse Anime</Button>
									</a>
								</NextLink>
							</Stack>
						)}
					</>
				)}
				<HStack w={300} align="center" justify="space-between" pt={5}>
					<Text fontWeight={600}>Voting For: </Text>
					<Select
						w="60%"
						defaultValue={typeAsEnum}
						onChange={(e) =>
							router.push(`/vote/${e.target.value.toLowerCase()}`)
						}
					>
						{types.map((x, idx) => (
							<option key={idx} value={x.status}>
								{x.icon} {x.text}
							</option>
						))}
					</Select>
				</HStack>
			</Box>
		</Layout>
	);
};

export default withApollo({ ssr: true })(Vote);
