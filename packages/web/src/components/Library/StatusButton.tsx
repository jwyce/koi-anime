import React from 'react';

import { Box, HStack, Text } from '@chakra-ui/react';
import { ListStatus } from '@koi/controller';

import { shallowRouteInput } from './UserLibrary';

interface StatusButtonProps {
	text: string;
	count: number;
	color: string;
	icon: string;
	selected: boolean;
	status: ListStatus | null;
	filterCallback: (options: shallowRouteInput) => void;
}

export const StatusButton: React.FC<StatusButtonProps> = ({
	text,
	color,
	count,
	icon,
	status,
	selected,
	filterCallback,
}) => {
	return (
		<Box
			p={2}
			m={1}
			bg={color}
			opacity={selected ? 1 : 0.42}
			cursor="pointer"
			_hover={{ bg: 'gray.300' }}
			onClick={() => filterCallback({ status })}
		>
			<HStack align="center" justify="space-between">
				<HStack>
					<Text fontWeight={100}>{icon}</Text>
					<Text fontWeight={700} textShadow="2px 2px #252525c5">
						{text}
					</Text>
				</HStack>
				<Text fontWeight={700} textShadow="2px 2px #252525c5">
					{count}
				</Text>
			</HStack>
		</Box>
	);
};
