import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { Layout } from '@/components/Layout/Layout';
import { Animeography } from '@/components/MediaDetail/Animeography';
import { MediaDescription } from '@/components/MediaDetail/MediaDescription';
import { MediaDetails } from '@/components/MediaDetail/MediaDetails';
import { PosterListControl } from '@/components/MediaDetail/PosterListControl';
import { Loader } from '@/components/UI/Loader';
import { withApollo } from '@/stores/withApollo';
import { isServer } from '@/utils/isServer';
import { Box, Image, Spacer } from '@chakra-ui/react';
import { useCharacterQuery, getPreferredName } from '@koi/controller';

import type { NextPage } from 'next';
export const CharacterDetail: NextPage = ({}) => {
	const router = useRouter();
	const { slug } = router.query;

	const { data, loading } = useCharacterQuery({
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
				title={`${data.character.englishName} - Koi Anime`}
				description="A short description goes here."
			/>
			<Box mt={-8} bg="black" opacity={0.5}>
				<Image
					src="https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png"
					alt="cover"
					fit="cover"
					h={350}
					w="100%"
				/>
			</Box>
			<Box w={1200} display="flex" mx="auto">
				<Box flex={0.6} h="100%" pos="sticky" mt="-24" top="24">
					<PosterListControl
						posterSrc={data.character.imageOriginal}
						rank={data.character.rank}
						type="character"
						slug={data.character.slug}
					/>
				</Box>
				<Box flex={1.8} h="100%" px={5}>
					<MediaDescription
						title={getPreferredName(
							data.character?.englishName!,
							data.character?.japaneseName!,
							data.character?.canonicalName!,
							data.character?.canonicalName!
						)}
						description={data.character.description}
					/>
					<Spacer mt={3} />
					<Animeography characterSlug={data.character.slug} />
				</Box>
				<Box flex={1} h="100%" pos="sticky" top={16}>
					<MediaDetails
						type="character"
						enName={data.character.englishName}
						jpName={data.character.japaneseName}
						canonName={data.character.canonicalName}
						gender={data.character.gender}
					/>
				</Box>
			</Box>
		</Layout>
	);
};

export default withApollo({ ssr: false })(CharacterDetail);
