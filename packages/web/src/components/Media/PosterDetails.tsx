import { motion } from 'framer-motion';
import React from 'react';

import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Status } from '@koi/controller';
import { PosterStatus } from './PosterStatus';

interface PosterDetailsProps {
	title: string;
	synopsis: string;
	rank?: number;
	date: string;
	status: Status;
}

export const PosterDetails: React.FC<PosterDetailsProps> = ({
	title,
	synopsis,
	rank,
	date,
	status,
}) => {
	return (
		<motion.div
			style={{
				position: 'absolute',
				zIndex: 9998,
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

			<PosterStatus status={status} />

			<Text fontSize="sm">{synopsis}</Text>
		</motion.div>
	);
};
