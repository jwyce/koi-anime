import { motion } from 'framer-motion';
import NextLink from 'next/link';
import React from 'react';

import { Box, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import { ResourceType } from '@koi/controller';
import { HeartIcon } from '../UI/HeartIcon';

interface PosterProps {
	imgSource: string;
	name: string;
	rank: number;
	url: string;
	type: ResourceType;
}

export const RankedResource: React.FC<PosterProps> = ({
	imgSource,
	name,
	rank,
	url,
	type,
}) => {
	return (
		<Box pos="relative">
			<NextLink href={url}>
				<a>
					<Box pos="absolute" top={1} right={1} zIndex={999}>
						<HeartIcon rank={rank} size={32} />
					</Box>
					<motion.div
						style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							background: '#000',
							borderRadius: 6,
							top: 0,
							left: 0,
							opacity:
								type === ResourceType.EdSong || type === ResourceType.OpSong
									? 0.69
									: 0,
						}}
						whileHover={{
							opacity:
								type === ResourceType.EdSong || type === ResourceType.OpSong
									? 0.8
									: 0.69,
						}}
						transition={{ duration: 0.3 }}
					>
						<Stack align="center" justify="center" w="100%" h="100%" px={3}>
							<Text fontSize="xl" fontWeight={700} textAlign="center">
								{name}
							</Text>
						</Stack>
					</motion.div>
					<Image
						src={imgSource}
						alt={name}
						w={200}
						borderRadius={6}
						fallback={<Skeleton h={64} w={190} />}
					/>
				</a>
			</NextLink>
		</Box>
	);
};
