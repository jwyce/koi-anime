import { Box, HStack, Text } from '@chakra-ui/react';
import React from 'react';

interface StatusButtonProps {
	text: string;
	count: number;
	color: string;
	icon: string;
	selected: boolean;
}

export const StatusButton: React.FC<StatusButtonProps> = ({
	text,
	color,
	count,
	icon,
	selected,
}) => {
	return (
		<Box p={2} m={1} bg={color} opacity={selected ? 1 : 0.42} cursor="pointer">
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
