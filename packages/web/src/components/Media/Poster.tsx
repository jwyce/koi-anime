import { motion } from 'framer-motion';
import NextLink from 'next/link';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';

import { Box, Image, Skeleton } from '@chakra-ui/react';
import { Status } from '@koi/controller';

import { PosterDetails } from './PosterDetails';

interface PosterProps {
	posterSrc: string;
	title: string;
	synopsis: string;
	rank?: number;
	date: string;
	status: Status;
	url: string;
}

export const Poster: React.FC<PosterProps> = ({
	posterSrc,
	title,
	synopsis,
	rank,
	date,
	status,
	url,
}) => {
	// const router = useRouter();
	const [hovering, setHovering] = useState(false);

	return (
		<Box
			pos="relative"
			onMouseEnter={() => setHovering(true)}
			onMouseOut={() => setHovering(false)}
		>
			<NextLink href={url}>
				<a>
					<motion.div
						style={{
							position: 'absolute',
							width: '100%',
							height: '100%',
							background: '#000',
							borderRadius: 6,
							top: 0,
							left: 0,
							opacity: 0,
						}}
						whileHover={{ opacity: 0.69 }}
						transition={{ duration: 0.3 }}
					></motion.div>
					<Image
						src={posterSrc}
						alt={title}
						w={200}
						borderRadius={6}
						fallback={<Skeleton h={64} w={190} />}
					/>
				</a>
			</NextLink>
			{hovering && (
				<PosterDetails
					title={title}
					synopsis={synopsis}
					rank={rank}
					date={date}
					status={status}
				/>
			)}
		</Box>
	);
};