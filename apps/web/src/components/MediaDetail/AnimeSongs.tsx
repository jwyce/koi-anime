import React from 'react';
import { IoMusicalNotes } from 'react-icons/io5';

import { isServer } from '@/utils/isServer';
import {
	Box,
	Heading,
	HStack,
	SimpleGrid,
	Text,
	useColorMode,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import {
	DefaultSongFragment,
	SongType,
	useEndingsQuery,
	useOpeningsQuery,
} from '@koi/controller';

import { HeartIcon } from '../UI/HeartIcon';

interface AnimeSongsProps {
	animeId: number;
	songs: DefaultSongFragment[];
}

export const AnimeSongs: React.FC<AnimeSongsProps> = ({ animeId, songs }) => {
	const { colorMode } = useColorMode();
	const { data: opData } = useOpeningsQuery({
		variables: { id: animeId },
		skip: isServer(),
	});
	const { data: edData } = useEndingsQuery({
		variables: { id: animeId },
		skip: isServer(),
	});

	return (
		<Box mb={6}>
			<HStack>
				<IoMusicalNotes size={36} />
				<Heading fontSize="3xl">Opening Themes</Heading>
			</HStack>
			<SimpleGrid columns={2} spacing={2} mt={3}>
				{songs
					.filter((x) => x.songType === SongType.Op)
					.map((x, i) => (
						<Box
							borderRadius={3}
							bg={colorMode === 'dark' ? 'gray.900' : 'white'}
							p={2}
							key={`${x.name}-${i}`}
						>
							<Wrap spacing={3} letterSpacing={4}>
								<WrapItem>
									<HStack>
										<Box>
											<HeartIcon
												rank={
													opData?.openingsForAnime.find(
														(y) => y.slug === x.slug
													)?.rank?.rank
												}
												size={32}
											/>
										</Box>
										<Text fontWeight="bold">{x.name}</Text>
									</HStack>
								</WrapItem>
								<WrapItem>
									<Text color="gray.500"> by {x.artist}</Text>
								</WrapItem>
							</Wrap>
						</Box>
					))}
			</SimpleGrid>
			{songs.filter((x) => x.songType === SongType.Op).length === 0 && (
				<Text color="gray.500">Looks like there are no openings :(</Text>
			)}
			<HStack mt={6}>
				<IoMusicalNotes size={36} />
				<Heading fontSize="3xl">Ending Themes</Heading>
			</HStack>
			<SimpleGrid columns={2} spacing={2} mt={3}>
				{songs
					.filter((x) => x.songType === SongType.Ed)
					.map((x, i) => (
						<Box
							borderRadius={3}
							bg={colorMode === 'dark' ? 'gray.900' : 'white'}
							p={2}
							key={`${x.name}-${i}`}
						>
							<Wrap spacing={3} letterSpacing={4}>
								<WrapItem>
									<HStack justify="flex-start">
										<Box>
											<HeartIcon
												rank={
													edData?.endingsForAnime.find((y) => y.slug === x.slug)
														?.rank?.rank
												}
												size={32}
											/>
										</Box>
										<Text fontWeight="bold">{x.name}</Text>
									</HStack>
								</WrapItem>
								<WrapItem>
									<Text color="gray.500"> by {x.artist}</Text>
								</WrapItem>
							</Wrap>
						</Box>
					))}
			</SimpleGrid>
			{songs.filter((x) => x.songType === SongType.Ed).length === 0 && (
				<Text color="gray.500">Looks like there are no endings :(</Text>
			)}
		</Box>
	);
};
