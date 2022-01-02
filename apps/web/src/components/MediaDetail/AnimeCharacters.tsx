import React from 'react';

import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { useAnimeCharactersQuery, getPreferredName } from '@koi/controller';

import { isServer } from '../../utils/isServer';
import { Layout } from '../Layout/Layout';
import { MediaLink } from '../Media/MediaLink';
import { Loader } from '../UI/Loader';

interface AnimeCharactersProps {
	id: number;
}

export const AnimeCharacters: React.FC<AnimeCharactersProps> = ({ id }) => {
	const { data, loading } = useAnimeCharactersQuery({
		variables: { id },
		skip: isServer(),
	});

	return (
		<Box>
			<Heading fontSize="3xl">Characters</Heading>
			{loading || !data ? (
				<Layout>
					<Loader size="xl" />
				</Layout>
			) : (
				<Grid templateColumns="repeat(5, 1fr)" gap={3} mt={1}>
					{data.charactersForAnime.map((x) => (
						<MediaLink
							key={x.slug}
							url={`/anime/character/${x.slug}`}
							name={getPreferredName(
								x.englishName,
								x.japaneseName,
								x.canonicalName,
								x.canonicalName
							)}
							imageSrc={x.imageOriginal}
						/>
					))}
				</Grid>
			)}
			<>
				{data?.charactersForAnime.length === 0 && (
					<Text color="gray.500">
						Looks like we don't have any characters :(
					</Text>
				)}
			</>
		</Box>
	);
};
