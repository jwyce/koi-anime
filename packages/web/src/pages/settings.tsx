import { NextSeo } from 'next-seo';
import React from 'react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button, Spacer, useColorMode } from '@chakra-ui/react';

import { Layout } from '../components/Layout';
import { HeartIcon } from '../components/styles/HeartIcon';
import { withApollo } from '../stores/withApollo';

export const Settings: React.FC<{}> = ({}) => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Layout>
			<NextSeo
				title="Settings - Koi Anime"
				description="A short description goes here."
			/>
			<Button
				leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
				onClick={toggleColorMode}
			>
				{colorMode === 'light' ? 'Dark' : 'Light'}
			</Button>
			<Spacer m={2} />
			<HeartIcon rank={4} size={36} />
		</Layout>
	);
};

export default withApollo({ ssr: false })(Settings);
