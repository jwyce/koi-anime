import { profileColor } from '@/utils/profilePreferences';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Stack,
	Box,
	Image,
	Menu,
	Button,
	HStack,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { ListStatus } from '@koi/controller';
import React, { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';
import { HeartIcon } from '../UI/HeartIcon';

interface PosterListControlProps {
	rank: number;
	posterSrc: string | undefined;
	type: 'anime' | 'manga' | 'character';
}

export const PosterListControl: React.FC<PosterListControlProps> = ({
	rank,
	posterSrc,
	type,
}) => {
	const [status, setState] = useState<ListStatus | null>(null);
	const statusList = [
		{
			icon: '🔥',
			status: ListStatus.Watching,
			text: type === 'anime' ? 'Started Watching' : 'Started Reading',
		},
		{
			icon: '💖',
			status: ListStatus.WantToWatch,
			text: type === 'anime' ? 'Want to Watch' : 'Want to Read',
		},
		{ icon: '✅', status: ListStatus.Completed, text: 'Completed' },
		{ icon: '⏳', status: ListStatus.OnHold, text: 'On Hold' },
		{ icon: '💩', status: ListStatus.Dropped, text: 'Dropped' },
		{ icon: '🗑️', status: null, text: 'Remove from Library' },
	];

	return (
		<Stack>
			<Image src={posterSrc} alt="poster" borderRadius={6} />
			{rank < 1000 && (
				<Box pos="absolute" top={-1} right={1}>
					<HeartIcon rank={rank} size={36} />
				</Box>
			)}
			<>
				{type !== 'character' && (
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
							{status ? (
								<HStack spacing="1">
									<Box mr={3}>
										<BsCircleFill
											size={24}
											color={profileColor('blue') ?? 'transparent'}
										/>
									</Box>
									<Text textTransform="capitalize">{status}</Text>
								</HStack>
							) : (
								<HStack>
									<span>Add to Library</span>
								</HStack>
							)}
						</MenuButton>
						<MenuList overflowY="scroll" maxH="60">
							{statusList.map((x, idx) => (
								<MenuItem
									icon={<Text>{x.icon}</Text>}
									key={idx}
									onClick={() => alert('hi')}
								>
									{x.text}
								</MenuItem>
							))}
						</MenuList>
					</Menu>
				)}
			</>
		</Stack>
	);
};
