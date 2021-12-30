import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { Layout } from '@/components/Layout/Layout';
import { UserHeader } from '@/components/Library/UserHeader';
import { UserLibrary } from '@/components/Library/UserLibrary';
import { Loader } from '@/components/UI/Loader';
import { withApollo } from '@/stores/withApollo';
import { Box } from '@chakra-ui/react';
import { useUserQuery } from '@koi/controller';

export const Library: NextPage = ({}) => {
	const router = useRouter();
	const { username } = router.query;

	const [shouldSkip, setShouldSkip] = useState(true);
	const { data, loading, error } = useUserQuery({
		variables: { username: username as string },
		skip: shouldSkip,
	});

	useEffect(() => {
		if (username) {
			setShouldSkip(false);
		}
	}, [username]);

	if (error) {
		router.replace('/404');
	}

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
				title={`${username ? `${username}'s` : ''} Library - Koi Anime`}
				description="A short description goes here."
			/>
			<Box w={1200} mx="auto">
				<UserHeader user={data.user} />
			</Box>
			<Box display="flex" w={1200} mx="auto">
				<UserLibrary user={data.user} />
			</Box>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Library);
