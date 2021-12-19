import { Box, Grid, Heading, Stack, Text, Image } from '@chakra-ui/react';
import { useAnimeCharactersQuery } from '@koi/controller';
import React from 'react';
import { isServer } from '../../utils/isServer';
import { Layout } from '../Layout/Layout';
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
						<Stack
							key={i}
							bg="gray.700"
							borderRadius={6}
							alignItems="center"
							pb={1}
						>
							<Image src={x.imageOriginal} alt="char" />

							<Text fontSize="xx-small">{x.canonicalName}</Text>
						</Stack>
					))}
				</Grid>
			)}
		</Box>
	);
};
