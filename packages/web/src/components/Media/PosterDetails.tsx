import { motion } from 'framer-motion';
import React from 'react';

import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Status } from '@koi/controller';
import { PosterStatus } from './PosterStatus';

interface PosterDetailsProps {
	title: string;
	synopsis: string;
	rank?: number;
	date: string;
	status?: Status;
}

export const PosterDetails: React.FC<PosterDetailsProps> = ({
	title,
	synopsis,
	rank,
	date,
	status,
}) => {
	return (
		<>
			<motion.div
				style={{
					position: 'absolute',
					zIndex: 9990,
					left: '105%',
					top: 0,
					maxHeight: 270,
					width: 350,
					background: '#171923',
					opacity: 0,
					padding: 10,
					borderRadius: 5,
					overflowY: 'hidden',
				}}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				<Wrap>
					<WrapItem>
						<Text fontSize="lg" fontWeight="semibold">
							{title}
						</Text>
					</WrapItem>
					<WrapItem>
						<Text fontSize="lg" color="gray.500">
							{date === '' ? 'TBA' : date}
						</Text>
					</WrapItem>
				</Wrap>

				{status && <PosterStatus status={status} />}

				<Text fontSize="sm">{synopsis}</Text>
				<Box
					pos="absolute"
					w="100%"
					h="14"
					bottom={0}
					left={0}
					backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))"
				></Box>
			</motion.div>
			<motion.div
				style={{
					position: 'absolute',
					zIndex: 9991,
					top: 10,
					left: '100%',
					borderTop: '10px solid transparent',
					borderRight: '12px solid #171923',
					borderBottom: '10px solid transparent',
					opacity: 0,
					borderRadius: 5,
					overflowY: 'hidden',
				}}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			></motion.div>
		</>
	);
};
