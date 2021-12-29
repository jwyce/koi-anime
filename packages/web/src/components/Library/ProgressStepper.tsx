import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	HStack,
	IconButton,
	Progress,
	Text,
} from '@chakra-ui/react';
import React from 'react';

interface ProgressStepperProps {
	count: number;
	total: number;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
	count,
	total,
}) => {
	return (
		<Box>
			<Progress size="xs" colorScheme="teal" value={(count / total) * 100} />
			<HStack py={1} align="center" justify="space-between" px={2}>
				<IconButton size="xs" aria-label="sub" icon={<MinusIcon />} />
				<Button size="xs">
					{count === 0 ? (
						<Text fontSize="smaller">Not Started</Text>
					) : (
						<Text fontSize="smaller">Ep. {count}</Text>
					)}
				</Button>
				<IconButton size="xs" aria-label="add" icon={<AddIcon />} />
			</HStack>
		</Box>
	);
};
