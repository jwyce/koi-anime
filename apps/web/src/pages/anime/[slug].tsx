import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { useIsAuth } from '@/utils/hooks/useIsAuth';
import { Box, Image, Spacer } from '@chakra-ui/react';
import { useAnimeQuery, getPreferredName } from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { AnimeCharacters } from '../../components/MediaDetail/AnimeCharacters';
import { AnimeSongs } from '../../components/MediaDetail/AnimeSongs';
import { MediaDescription } from '../../components/MediaDetail/MediaDescription';
import { MediaDetails } from '../../components/MediaDetail/MediaDetails';
import { PosterListControl } from '../../components/MediaDetail/PosterListControl';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { isServer } from '../../utils/isServer';

import type { NextPage } from 'next';
export const AnimeDetail: NextPage = ({}) => {
	useIsAuth();
	const router = useRouter();
	const { slug } = router.query;

	const { data, loading } = useAnimeQuery({
		variables: { slug: slug as string },
		skip: isServer(),
	});

	if (loading || !data) {
		return (
			<Layout>
				<Loader size="xl" />
			</Layout>
		);
	}

	return (
		<Layout variant="full">
			<NextSeo
				title={`${data.anime?.englishTitle} - Koi Anime`}
				description="A short description goes here."
			/>
			<Box mt={-8} bg="black" opacity={0.5}>
				<Image
					src={data?.anime?.coverLinkOriginal}
					alt="cover"
					fit="cover"
					h={350}
					w="100%"
					fallbackSrc="https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png"
				/>
			</Box>
			<Box w={1200} display="flex" mx="auto">
				<Box flex={0.6} h="100%" pos="sticky" mt="-24" top="24">
					<PosterListControl
						posterSrc={data.anime?.posterLinkOriginal}
						rank={data.anime?.rank}
						type="anime"
						slug={data.anime?.slug ?? ''}
					/>
				</Box>
				<Box flex={1.8} h="100%" px={5}>
					<MediaDescription
						title={getPreferredName(
							data.anime?.englishTitle!,
							data.anime?.japaneseTitle!,
							data.anime?.romajiTitle!,
							data.anime?.canonicalTitle!
						)}
						date={data.anime?.startDate!}
						description={data.anime?.synopsis!}
						rank={data.anime?.rank}
					/>
					<Spacer mt={3} />
					<AnimeCharacters id={data.anime?.id ?? 0} />
					<Spacer mt={6} />
					<AnimeSongs songs={data.anime?.songs!} animeId={data.anime?.id!} />
				</Box>
				<Box flex={1} h="100%" pos="sticky" top={16}>
					<MediaDetails
						type="anime"
						enName={data.anime?.englishTitle!}
						jpName={data.anime?.japaneseTitle!}
						enjpName={data.anime?.romajiTitle!}
						canonName={data.anime?.canonicalTitle!}
						status={data.anime?.status!}
						subtype={data.anime?.subtype!}
						episodes={data.anime?.episodeCount!}
						rating={data.anime?.ageRating!}
						ratingGuide={data.anime?.ageRatingGuide!}
						studios={data.anime?.studios!}
						startDate={data.anime?.startDate}
						endDate={data.anime?.endDate}
						tba={data.anime?.tba}
						youtubeVideoId={data.anime?.youtubeVideoId}
					/>
				</Box>
			</Box>
		</Layout>
	);
};

export default withApollo({ ssr: false })(AnimeDetail);
