import NextImage from 'next/image';
import React from 'react';

import {
	Box,
	HStack,
	Image,
	SimpleGrid,
	Stack,
	Text,
	useColorMode,
	useDisclosure,
} from '@chakra-ui/react';
import { AgeRating, AnimeSubtype, MangaSubtype, Status } from '@koi/controller';

import ytLogo from '../../assets/images/youtube-icon.svg';
import { YoutubePreview } from './YoutubePreview';
import { MediaSubtypes } from './MediaSubtypes';
import { PosterStatus } from '../Media/PosterStatus';
import dayjs from 'dayjs';
import { seasonFromDate } from '../../utils/seasonFromDate';

interface MediaDetailsProps {
	type: 'anime' | 'manga' | 'character';
	enName: string;
	jpName: string;
	enjpName?: string;
	canonName: string;
	startDate?: Date;
	endDate?: Date;
	tba?: string;
	subtype?: AnimeSubtype | MangaSubtype;
	episodes?: number;
	chapters?: number;
	volumes?: number;
	gender?: string;
	studios?: string[];
	serialization?: string;
	rating?: AgeRating;
	ratingGuide?: string;
	status?: Status;
	youtubeVideoId?: string;
}

export const MediaDetails: React.FC<MediaDetailsProps> = ({
	type,
	enName,
	jpName,
	enjpName,
	canonName,
	startDate,
	endDate,
	tba,
	subtype,
	episodes,
	chapters,
	volumes,
	gender,
	studios,
	serialization,
	rating,
	ratingGuide,
	status,
	youtubeVideoId,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();

	return (
		<>
			<Stack pt={3}>
				{youtubeVideoId && youtubeVideoId !== '' && (
					<Box
						w="100%"
						maxH={72}
						pos="relative"
						cursor="pointer"
						onClick={onOpen}
					>
						<Image
							src={`https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`}
							fit="cover"
							h="16"
							w="100%"
							borderRadius={6}
						/>
						<Box
							pos="absolute"
							top={0}
							left={0}
							w="100%"
							h="100%"
							borderRadius={6}
							boxShadow="inset 0px 0px 44px 10px #000000"
							opacity={0.42}
						></Box>
						<HStack
							pos="absolute"
							top="50%"
							left="50%"
							transform="translate(-50%, -50%)"
						>
							<NextImage src={ytLogo} alt="ytlogo" width="36" />
							<Text fontSize="xl" color="white" fontWeight="bold">
								Play Trailer
							</Text>
						</HStack>
					</Box>
				)}

				<Box
					bg={colorMode === 'dark' ? 'gray.700' : 'white'}
					p={3}
					borderRadius={6}
				>
					<Text
						fontSize="lg"
						fontWeight="bold"
						textTransform="capitalize"
						pb={3}
					>
						{type} Details
					</Text>
					<SimpleGrid columns={2} spacingY={2}>
						{enName !== canonName && (
							<>
								<Text fontSize="smaller" fontWeight="bold">
									English
								</Text>
								<Text fontSize="smaller">{enName}</Text>
							</>
						)}
						{jpName !== '' && (
							<>
								<Text fontSize="smaller" fontWeight="bold">
									Japanese
								</Text>
								<Text fontSize="smaller">{jpName}</Text>
							</>
						)}
						<Text fontSize="smaller" fontWeight="bold">
							Canonical
						</Text>
						<Text fontSize="smaller">{canonName}</Text>
						{type !== 'character' && (
							<>
								{enjpName !== '' && (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Japanese (Romaji)
										</Text>
										<Text fontSize="smaller">{enjpName}</Text>
									</>
								)}
								<Text fontSize="smaller" fontWeight="bold">
									Status
								</Text>
								<Text fontSize="smaller">
									<PosterStatus status={status ?? Status.Tba} />
								</Text>
								<Text fontSize="smaller" fontWeight="bold">
									Rating
								</Text>
								<Text fontSize="smaller">
									{rating} {ratingGuide === '' ? '' : ` – ${ratingGuide}`}
								</Text>
								{tba && tba !== '' ? (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Expected
										</Text>
										<Text fontSize="smaller">{tba}</Text>
									</>
								) : (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Aired
										</Text>
										<Text fontSize="smaller">
											{dayjs(startDate).format('MMM D, YYYY')}
											{!dayjs(endDate).isSame('1000-01-01') &&
											!dayjs(endDate).isSame(dayjs(startDate))
												? ` – ${dayjs(endDate).format('MMM D, YYYY')}`
												: ''}
										</Text>
										<Text fontSize="smaller" fontWeight="bold">
											Season
										</Text>
										<Text fontSize="smaller">
											{startDate
												? `${seasonFromDate(startDate)} ${dayjs(
														startDate
												  ).year()}`
												: ''}
											{endDate &&
											!dayjs(endDate).isSame('1000-01-01') &&
											!dayjs(endDate).isSame(dayjs(startDate))
												? ` – ${seasonFromDate(endDate)} ${dayjs(
														endDate
												  ).year()}`
												: ''}
										</Text>
									</>
								)}
							</>
						)}
						{type === 'anime' && (
							<>
								<Text fontSize="smaller" fontWeight="bold">
									Type
								</Text>
								<Text fontSize="smaller">
									<MediaSubtypes type="anime" subtype={subtype} />
								</Text>
								{episodes !== undefined && episodes > 0 && (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Episodes
										</Text>
										<Text fontSize="smaller">{episodes}</Text>
									</>
								)}
								{studios && studios.length > 0 && (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Studios
										</Text>
										<Text fontSize="smaller">{studios?.join(', ')}</Text>
									</>
								)}
							</>
						)}
						{type === 'manga' && (
							<>
								<Text fontSize="smaller" fontWeight="bold">
									Type
								</Text>
								<Text fontSize="smaller">
									<MediaSubtypes type="manga" subtype={subtype} />
								</Text>
								{volumes !== undefined && volumes > 0 && (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Volumes
										</Text>
										<Text fontSize="smaller">{volumes}</Text>
									</>
								)}
								{chapters !== undefined && chapters > 0 && (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Chapters
										</Text>
										<Text fontSize="smaller">{chapters}</Text>
									</>
								)}
								{serialization && serialization !== '' && (
									<>
										<Text fontSize="smaller" fontWeight="bold">
											Serialization
										</Text>
										<Text fontSize="smaller">{serialization}</Text>
									</>
								)}
							</>
						)}
						{type === 'character' && (
							<>
								<Text fontSize="smaller" fontWeight="bold">
									Gender
								</Text>
								<Text fontSize="smaller">
									<MediaSubtypes type="character" subtype={gender} />
								</Text>
							</>
						)}
					</SimpleGrid>
				</Box>
			</Stack>
			{youtubeVideoId && youtubeVideoId !== '' && (
				<YoutubePreview
					title={enName}
					isOpen={isOpen}
					onClose={onClose}
					youtubeVideoId={youtubeVideoId}
				/>
			)}
		</>
	);
};
