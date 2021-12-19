import { motion } from 'framer-motion';
import NextLink from 'next/link';
import React from 'react';

import { Box, Image, Stack, Text } from '@chakra-ui/react';

interface CharacterMugProps {
	imageSrc: string;
	name: string;
	url: string;
}

export const CharacterMug: React.FC<CharacterMugProps> = ({
	imageSrc,
	name,
	url,
}) => {
	return (
		<Stack bg="gray.700" borderRadius={6} alignItems="center" pb={1}>
			<Box pos="relative" cursor="pointer">
				<NextLink href={url}>
					<a>
						<motion.div
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								background: '#000',
								top: 0,
								left: 0,
								opacity: 0,
							}}
							whileHover={{ opacity: 0.42 }}
							transition={{ duration: 0.3 }}
						></motion.div>

						<Image src={imageSrc} alt="char" />
					</a>
				</NextLink>
			</Box>

			<Text fontSize="xx-small">{name}</Text>
		</Stack>
	);
};
