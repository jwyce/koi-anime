import { motion } from 'framer-motion';
import React from 'react';

import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { IoMusicalNotes } from 'react-icons/io5';

interface ResourceProps {
	imageSrc: string;
	name: string;
	isSong?: boolean;
}

export const Resource: React.FC<ResourceProps> = ({
	imageSrc,
	name,
	isSong = false,
}) => {
	return (
		<Stack
			bg="gray.700"
			borderRadius={6}
			alignItems="center"
			justifyContent="space-between"
			pb={1}
			maxW={280}
		>
			<Box pos="relative" cursor="pointer">
				<motion.div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						background: '#000',
						top: 0,
						left: 0,
						opacity: isSong ? 0.42 : 0,
					}}
					whileHover={{ opacity: isSong ? 0.69 : 0.42 }}
					transition={{ duration: 0.3 }}
				></motion.div>
				{isSong && (
					<Box
						pos="absolute"
						top="50%"
						left="50%"
						transform="translate(-50%, -50%)"
					>
						<IoMusicalNotes size={128} opacity={0.6} />
					</Box>
				)}

				<Image src={imageSrc} alt="media link" fit="cover" />
			</Box>

			<Text fontSize="md" textAlign="center" px={1}>
				{name}
			</Text>
		</Stack>
	);
};
