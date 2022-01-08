import React from 'react';

import { Box, Grid, Heading } from '@chakra-ui/react';
import { ResourceType, useGetMyTop5Query } from '@koi/controller';

import { Loader } from '../UI/Loader';
import { RankedResource } from '../Media/RankedResource';
import { urlPathFromResource } from '@/pages/top-rated/[type]';

interface Top5Props {
	type: ResourceType;
	title: string;
}

export const MyTop5: React.FC<Top5Props> = ({ type, title }) => {
	const { data, loading } = useGetMyTop5Query({
		variables: {
			type,
		},
	});
	if (loading || !data) {
		return <Loader size="xl" />;
	}
	return (
		<Box pb={5}>
			<Box pt={3}>
				{data.getUserTop5.length === 0 ? (
					<Box bg="gray.700" p={5} borderRadius={3}>
						<Heading fontSize="lg" color="gray.500">
							Hmm, there doesn't seem to be anything here yet.
						</Heading>
					</Box>
				) : (
					<>
						<Heading fontSize="2xl" fontWeight={600} pb={2}>
							{title}
						</Heading>
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
					</>
				)}
			</Box>
		</Box>
	);
};
