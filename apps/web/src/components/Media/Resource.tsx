import { motion } from 'framer-motion';
import NextLink from 'next/link';
import React from 'react';
import { IoMusicalNotes } from 'react-icons/io5';

import { Box, Image, Stack, Text } from '@chakra-ui/react';

interface ResourceProps {
	imageSrc: string;
	name: string;
	isSong?: boolean;
	url?: string;
	callback?: () => void;
}

export const Resource: React.FC<ResourceProps> = ({
	imageSrc,
	name,
	isSong = false,
	url,
	callback,
}) => {
	return (
		<Stack
			bg="pink.900"
			color="white"
			borderRadius={6}
			alignItems="center"
			justifyContent="space-between"
			pb={1}
			maxW={280}
		>
			{url ? (
				<NextLink href="url">
					<a>
						<Box pos="relative" cursor="pointer" w="100%">
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

							<Image src={imageSrc} alt="media link" fit="contain" />
						</Box>
					</a>
				</NextLink>
			) : (
				<Box pos="relative" cursor="pointer" onClick={callback}>
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
			)}

			<Text fontSize="md" textAlign="center" px={1}>
				{name}
			</Text>
		</Stack>
	);
};
