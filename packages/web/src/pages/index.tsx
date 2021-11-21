import { NextSeo } from 'next-seo';

import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';

import { Layout } from '../components/Layout';
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
			<div>hello world</div>
			<Button colorScheme="orange" onClick={toggleColorMode}>
				{colorMode === 'light' ? 'Dark' : 'Light'}
			</Button>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Home);
