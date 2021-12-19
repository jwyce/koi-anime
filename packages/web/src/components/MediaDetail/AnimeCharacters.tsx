import { Box, Grid, Heading, Stack, Text, Image } from '@chakra-ui/react';
import { useAnimeCharactersQuery } from '@koi/controller';
import React from 'react';
import { isServer } from '../../utils/isServer';
import { Layout } from '../Layout/Layout';
import { CharacterMug } from '../Media/CharacterMug';
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
				<Grid templateColumns="repeat(5, 1fr)" gap={3}>
					{data.charactersForAnime.map((x, i) => (
						<CharacterMug
							key={i}
							url={`/anime/character/${x.slug}?id=${x.id}`}
							name={x.canonicalName}
							imageSrc={x.imageOriginal}
						/>
					))}
				</Grid>
			)}
		</Box>
	);
};
