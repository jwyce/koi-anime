import React from 'react';

import { Box, Grid, Heading, useColorMode } from '@chakra-ui/react';
import { ResourceType, useGetUserTop5Query } from '@koi/controller';

import { Loader } from '../UI/Loader';
import { RankedResource } from '../Media/RankedResource';
import { urlPathFromResource } from '@/pages/top-rated/[type]';

interface Top5Props {
	type: ResourceType;
	title: string;
	username: string;
}

export const UserTop5: React.FC<Top5Props> = ({ type, title, username }) => {
	const { colorMode } = useColorMode();
	const { data, loading } = useGetUserTop5Query({
		variables: {
			type,
			username,
		},
	});
	if (loading || !data) {
		return <Loader size="xl" />;
	}
	return (
		<Box pb={5}>
			<Box pt={3}>
				<Heading fontSize="2xl" fontWeight={600} pb={2}>
					{title}
				</Heading>
				{data.getUserTop5.length === 0 ? (
					<Box
						bg={colorMode === 'dark' ? 'gray.700' : 'white'}
						p={5}
						borderRadius={3}
					>
						<Heading fontSize="lg" color="gray.500">
							Hmm, there doesn&apos;t seem to be anything here yet.
						</Heading>
					</Box>
				) : (
					<Grid templateColumns="repeat(5, 1fr)" gap={3}>
						{data.getUserTop5.map((x) => (
							<RankedResource
								key={x.slug}
								imgSource={x.imageUrl}
								url={`/${urlPathFromResource(type)}/${
									type === ResourceType.EdSong || type === ResourceType.OpSong
										? x.animeSlug
										: x.slug
								}`}
								type={x.type}
								name={x.name}
								rank={x.rank}
							/>
						))}
					</Grid>
				)}
			</Box>
		</Box>
	);
};
