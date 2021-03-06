import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { useIsAuth } from '@/utils/hooks/useIsAuth';
import { Box, Image } from '@chakra-ui/react';
import { useMangaQuery, getPreferredName } from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { MediaDescription } from '../../components/MediaDetail/MediaDescription';
import { MediaDetails } from '../../components/MediaDetail/MediaDetails';
import { PosterListControl } from '../../components/MediaDetail/PosterListControl';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { isServer } from '../../utils/isServer';

import type { NextPage } from 'next';
export const MangaDetail: NextPage = ({}) => {
	useIsAuth();
	const router = useRouter();
	const { slug } = router.query;

	const { data, loading } = useMangaQuery({
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
				title={`${data.manga?.englishTitle} - Koi Anime`}
				description="A short description goes here."
			/>
			<Box bg="black">
				<Box mt={-8} opacity={0.7}>
					<Image
						src={data?.manga?.coverLinkOriginal}
						alt="cover"
						fit="cover"
						h={350}
						w="100%"
						fallbackSrc="https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png"
					/>
				</Box>
			</Box>
			<Box w={1200} display="flex" mx="auto">
				<Box flex={0.6} h="100%" pos="sticky" mt="-24" top="24">
					<PosterListControl
						posterSrc={data.manga?.posterLinkSmall}
						rank={data.manga?.rank}
						type="manga"
						slug={data.manga?.slug ?? ''}
					/>
				</Box>
				<Box flex={1.8} h="100%" px={5}>
					<MediaDescription
						title={getPreferredName(
							data.manga?.englishTitle!,
							data.manga?.japaneseTitle!,
							data.manga?.romajiTitle!,
							data.manga?.canonicalTitle!
						)}
						date={data.manga?.startDate!}
						description={data.manga?.synopsis!}
						rank={data.manga?.rank}
					/>
				</Box>
				<Box flex={1} h="100%" pos="sticky" top={16}>
					<MediaDetails
						type="manga"
						enName={data.manga?.englishTitle!}
						jpName={data.manga?.japaneseTitle!}
						enjpName={data.manga?.romajiTitle!}
						canonName={data.manga?.canonicalTitle!}
						status={data.manga?.status!}
						subtype={data.manga?.subtype!}
						volumes={data.manga?.volumeCount!}
						chapters={data.manga?.chapterCount!}
						rating={data.manga?.ageRating!}
						ratingGuide={data.manga?.ageRatingGuide!}
						serialization={data.manga?.serialization!}
						startDate={data.manga?.startDate}
						endDate={data.manga?.endDate}
						tba={data.manga?.tba}
					/>
				</Box>
			</Box>
		</Layout>
	);
};

export default withApollo({ ssr: false })(MangaDetail);
