import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { Layout } from '@/components/Layout/Layout';
import { withApollo } from '@/stores/withApollo';
import { Heading } from '@chakra-ui/react';

export const Library: NextPage = ({}) => {
	const router = useRouter();
	const { username } = router.query;

	return (
		<Layout>
			<NextSeo
				title={`${username}'s Library - Koi Anime`}
				description="A short description goes here."
			/>
			<Heading>{username}</Heading>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Library);
