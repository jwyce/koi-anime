import { isServer } from '@/utils/isServer';
import { Box, Grid, Heading } from '@chakra-ui/react';
import { useAnimeographyQuery } from '@koi/controller';
import React from 'react';
import { Layout } from '../Layout/Layout';
import { MediaLink } from '../Media/MediaLink';
import { Loader } from '../UI/Loader';

interface AnimeographyProps {
	characterSlug: string;
}

export const Animeography: React.FC<AnimeographyProps> = ({
	characterSlug,
}) => {
	const { data, loading } = useAnimeographyQuery({
		variables: { characterSlug },
		skip: isServer(),
	});
	return (
		<Box>
			<Heading fontSize="3xl">Animeography</Heading>
			{loading || !data ? (
				<Layout>
					<Loader size="xl" />
				</Layout>
			) : (
				<Grid templateColumns="repeat(5, 1fr)" gap={3} mt={1}>
					{data.animeography.map((x) => (
						<MediaLink
							key={x.slug}
							url={`/anime/${x.slug}`}
							name={x.canonicalTitle}
							imageSrc={x.posterLinkSmall}
						/>
					))}
				</Grid>
			)}
		</Box>
	);
};
