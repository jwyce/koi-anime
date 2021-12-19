import {
	Box,
	Heading,
	HStack,
	SimpleGrid,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { DefaultSongFragment, SongType } from '@koi/controller';
import React from 'react';
import { IoMusicalNotes } from 'react-icons/io5';

interface AnimeSongsProps {
	songs: DefaultSongFragment[];
}

export const AnimeSongs: React.FC<AnimeSongsProps> = ({ songs }) => {
	return (
		<Box mb={6}>
			<HStack>
				<IoMusicalNotes size={36} />
				<Heading fontSize="3xl">Opening Themes</Heading>
			</HStack>
			<SimpleGrid columns={2} spacing={2} mt={3}>
				{songs
					.filter((x) => x.songType === SongType.Op)
					.map((x) => (
						<Box borderRadius={3} bg="gray.700" p={2}>
							<Wrap spacing={3} letterSpacing={4}>
								<WrapItem>
									<Text fontWeight="bold">{x.name}</Text>
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
					.map((x) => (
						<Box borderRadius={3} bg="gray.700" p={2}>
							<Wrap spacing={3} letterSpacing={4}>
								<WrapItem>
									<Text fontWeight="bold">{x.name}</Text>
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
