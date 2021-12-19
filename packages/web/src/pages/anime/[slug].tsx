import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { Box, Image, Spacer } from '@chakra-ui/react';
import { useAnimeQuery } from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { AnimeCharacters } from '../../components/MediaDetail/AnimeCharacters';
import { MediaDescription } from '../../components/MediaDetail/MediaDescription';
import { MediaDetails } from '../../components/MediaDetail/MediaDetails';
import { PosterListControl } from '../../components/MediaDetail/PosterListControl';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { isServer } from '../../utils/isServer';

import type { NextPage } from 'next';
export const AnimeDetail: NextPage = ({}) => {
	const router = useRouter();
	const { slug, id } = router.query;
	const apiID = typeof id === 'string' ? parseInt(id) : -1;
	console.log(slug, id);

	const { data, loading } = useAnimeQuery({
		variables: { slug: slug as string, apiID },
		skip: isServer(),
	});

	if (loading || !data) {
		return (
			<Layout>
				<Loader size="xl" />
			</Layout>
		);
	}

	console.log(data?.anime);
	console.log('synopsis', data?.anime?.synopsis.split('\n'));

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
				/>
			</Box>
			<Box w={1200} display="flex" mx="auto">
				<Box flex={0.6} h="100%" pos="sticky" mt="-24" top="24">
					<PosterListControl
						posterSrc={data.anime?.posterLinkOriginal}
						rank={5}
					/>
				</Box>
				<Box flex={1.8} h="100%" px={5}>
					<MediaDescription
						title={data.anime?.englishTitle!}
						date={data.anime?.startDate!}
						description={data.anime?.synopsis!}
					/>
					<Spacer mt={3} />
					<AnimeCharacters id={data.anime?.id ?? 0} />
				</Box>
				<Box flex={1} h="100%">
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
						songs={data.anime?.songs!}
						youtubeVideoId={data.anime?.youtubeVideoId}
					/>
				</Box>
			</Box>
		</Layout>
	);
};

export default withApollo({ ssr: false })(AnimeDetail);
