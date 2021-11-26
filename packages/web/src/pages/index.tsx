import { NextSeo } from 'next-seo';

import { useColorMode } from '@chakra-ui/color-mode';
import { Button } from '@chakra-ui/react';

import { Layout } from '../components/Layout';
import { HeartIcon } from '../components/styles/HeartIcon';
import { withApollo } from '../utils/withApollo';

import type { NextPage } from 'next';
const Home: NextPage = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Layout>
			<NextSeo
				title="Home - Koi Anime"
				description="A short description goes here."
			/>
			<HeartIcon rank={4} size={36} />
			<HeartIcon rank={15} size={36} />
			<HeartIcon rank={44} size={36} />
			<HeartIcon rank={73} size={36} />
			<HeartIcon rank={456} size={36} />
			<Button colorScheme="orange" onClick={toggleColorMode}>
				{colorMode === 'light' ? 'Dark' : 'Light'}
			</Button>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Home);
