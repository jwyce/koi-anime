import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { Waypoint } from 'react-waypoint';

import { Layout } from '@/components/Layout/Layout';
import { RankedResource } from '@/components/Media/RankedResource';
import { Loader } from '@/components/UI/Loader';
import { withApollo } from '@/stores/withApollo';
import { isServer } from '@/utils/isServer';
import {
	Box,
	Grid,
	Heading,
	HStack,
	Select,
	Skeleton,
	Stack,
} from '@chakra-ui/react';
import { ResourceType, useGetGlobalTopRatedQuery } from '@koi/controller';

import type { NextPage } from 'next';

const urlPathFromResource = (resource: ResourceType) => {
	switch (resource) {
		case ResourceType.Anime:
		case ResourceType.OpSong:
		case ResourceType.EdSong:
			return 'anime';
		case ResourceType.Manga:
			return 'manga';
		case ResourceType.FCharacter:
		case ResourceType.MCharacter:
			return 'anime/character';
	}
};

export const GlobalTopRated: NextPage = ({}) => {
	const router = useRouter();
	const { type } = router.query;
	const typeAsEnum = (type as string)?.toUpperCase() as ResourceType;

	const { data, loading, fetchMore, variables } = useGetGlobalTopRatedQuery({
		variables: {
			offset: 0,
			limit: 20,
			type: typeAsEnum,
		},
		fetchPolicy: 'network-only',
		skip: isServer(),
	});

	if (loading) {
		return (
			<Layout>
				<Loader size="xl" />
			</Layout>
		);
	}

	const types = [
		{ icon: '🎥', status: ResourceType.Anime, text: 'Anime' },
		{ icon: '📙', status: ResourceType.Manga, text: 'Manga' },
		{ icon: '🎵', status: ResourceType.EdSong, text: 'Ending Song' },
		{ icon: '🎶', status: ResourceType.OpSong, text: 'Opening Song' },
		{ icon: '💎', status: ResourceType.MCharacter, text: 'Best Boy' },
		{ icon: '🌸', status: ResourceType.FCharacter, text: 'Best Girl' },
	];

	return (
		<Layout variant="full">
			<NextSeo
				title="Global Top Rated - Koi Anime"
				description="A short description goes here."
			/>
			<Stack alignItems="center">
				<Box w={1000} pb={5}>
					<Box textAlign="left" w="100%">
						<HStack align="center" justify="space-between" py={5}>
							<Heading pb={1} whiteSpace="nowrap">
								Global Top Rated
							</Heading>
							<Select
								size="lg"
								width={400}
								defaultValue={typeAsEnum}
								onChange={(e) =>
									router.push(`/top-rated/${e.target.value.toLowerCase()}`)
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
					{!data ? (
						<Loader size="xl" />
					) : (
						<Box pb={5}>
							<Grid templateColumns="repeat(5, 1fr)" gap={3}>
								{data.getTopRated.items.map((x) => (
									<RankedResource
										imgSource={x.imageUrl}
										name={x.name}
										key={x.slug}
										rank={x.rank}
										url={`/${urlPathFromResource(typeAsEnum)}/${
											typeAsEnum === ResourceType.EdSong ||
											typeAsEnum === ResourceType.OpSong
												? x.animeSlug
												: x.slug
										}`}
										type={typeAsEnum}
									/>
								))}
							</Grid>
							{data.getTopRated.hasMore && (
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
													limit: variables?.limit ?? 0,
													offset: data.getTopRated.nextCursor,
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

export default withApollo({ ssr: true })(GlobalTopRated);
