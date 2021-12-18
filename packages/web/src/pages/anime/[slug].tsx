import { useRouter } from 'next/router';
import React from 'react';

import {
	Box,
	Heading,
	Image,
	Stack,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { useAnimeQuery } from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { isServer } from '../../utils/isServer';

import type { NextPage } from 'next';
import dayjs from 'dayjs';
import { HeartIcon } from '../../components/UI/HeartIcon';
import { NextSeo } from 'next-seo';
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
				<Box flex={0.6} h="100%" pos="relative">
					<Stack pos="absolute" top={-100}>
						<Image
							src={data?.anime?.posterLinkOriginal}
							alt="poster"
							borderRadius={6}
						/>
						<Box pos="absolute" top={-1} right={1}>
							<HeartIcon rank={8} size={36} />
						</Box>
					</Stack>
				</Box>
				<Box flex={1.8} h="100%" px={5}>
					<Wrap align="flex-end">
						<WrapItem>
							<Heading fontSize="3xl">{data.anime?.englishTitle}</Heading>
						</WrapItem>
						<WrapItem>
							<Text fontSize="lg" color="gray.500" fontWeight="bold">
								{dayjs(data.anime?.startDate).format('YYYY')}
							</Text>
						</WrapItem>
					</Wrap>
					{data.anime?.synopsis.split('\n').map((x, i) => (
						<>{x === '' ? <br /> : <Text key={i}>{x}</Text>}</>
					))}
				</Box>
				<Box flex={1} bg="blueviolet" h="100%">
					3
				</Box>
			</Box>
		</Layout>
	);
};

export default withApollo({ ssr: false })(AnimeDetail);
