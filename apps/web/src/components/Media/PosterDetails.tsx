import { motion } from 'framer-motion';
import React from 'react';

import { Box, HStack, Text } from '@chakra-ui/react';
import { ListStatus, Rank, Status } from '@koi/controller';

import { HeartIcon } from '../UI/HeartIcon';
import { ApprovalText } from './ApprovalText';
import { PosterListStatus, PosterStatus } from './PosterStatus';

interface PosterDetailsProps {
	title: string;
	synopsis: string;
	rank?: Rank | null;
	date: string;
	status?: Status;
	listStatus?: ListStatus;
}

export const PosterDetails: React.FC<PosterDetailsProps> = ({
	title,
	synopsis,
	rank,
	date,
	status,
	listStatus,
}) => {
	return (
		<>
			<motion.div
				style={{
					position: 'absolute',
					zIndex: 9990,
					left: '105%',
					top: 0,
					maxHeight: '100%',
					width: 325,
					background: '#171923',
					opacity: 0,
					padding: 10,
					borderRadius: 5,
					overflowY: 'hidden',
				}}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				<Box px={2}>
					<Text fontSize="md" fontWeight="semibold">
						{title}{' '}
						<Text as="span" fontSize="md" color="gray.500">
							{date === '' ? 'TBA' : date}
						</Text>
					</Text>
					{rank && (
						<ApprovalText textApproval={rank.approval} truncated size="md" />
					)}
					<HStack justify="space-between">
						{listStatus && <PosterListStatus status={listStatus} />}
						{status && <PosterStatus status={status} />}
						{rank && rank.rank < 1000 && (
							<HeartIcon rank={rank.rank} size={24} />
						)}
					</HStack>

					<Text fontSize="xs" color="gray.300" pt={1}>
						{synopsis}
					</Text>
					<Box
						pos="absolute"
						w="100%"
						h="14"
						bottom={0}
						left={0}
						backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))"
					></Box>
				</Box>
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
