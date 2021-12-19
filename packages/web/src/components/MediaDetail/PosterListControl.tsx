import { Stack, Box, Image } from '@chakra-ui/react';
import React from 'react';
import { HeartIcon } from '../UI/HeartIcon';

interface PosterListControlProps {
	rank: number;
	posterSrc: string | undefined;
}

export const PosterListControl: React.FC<PosterListControlProps> = ({
	rank,
	posterSrc,
}) => {
	return (
		<Stack pos="absolute" top={-100}>
			<Image src={posterSrc} alt="poster" borderRadius={6} />
			{rank < 1000 && (
				<Box pos="absolute" top={-1} right={1}>
					<HeartIcon rank={rank} size={36} />
				</Box>
			)}
		</Stack>
	);
};
