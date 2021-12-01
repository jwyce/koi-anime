import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';

import { Heading, HStack, Stack, Text, useColorMode } from '@chakra-ui/react';

import logo from '../assets/images/koi-icon.svg';
import { Layout } from '../components/Layout';
import { withApollo } from '../stores/withApollo';

import type { NextPage } from 'next';
const Home: NextPage = () => {
	const { colorMode } = useColorMode();

	return (
		<Layout variant="full">
			<NextSeo
				title="Home - Koi Anime"
				description="A short description goes here."
			/>
			<Stack spacing="20">
				<HStack mt={20} justify="center">
					<Image src={logo} alt="logo" height="150em" width="150em" />
					<Stack pl={10} align="center">
						<Heading as="h1" fontSize="6xl">
							Koi Anime List
						</Heading>
						<Heading as="h6" fontSize="medium">
							v0.0.1
						</Heading>
						<Text fontSize="lg">
							Simple and complete testing utilities that encourage good testing
							practices
						</Text>
					</Stack>
				</HStack>

				<HStack
					p="8em"
					align="center"
					bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
				>
					<Text fontSize="larger">Get the app</Text>
					<img
						src="https://cdn.tophatch.com/img/5.0/button-appstore.svg"
						alt="apple app store"
					/>
					<img
						src="https://cdn.tophatch.com/img/android/buttons-download-play.svg"
						alt="google play"
					/>
				</HStack>

				<Stack align="center" p={5}>
					<Text fontSize="larger">contact</Text>
				</Stack>

				<Stack
					align="center"
					bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
					p={5}
				>
					<Image src={logo} alt="logo" height="120em" width="120em" />
					<Text fontSize="larger">
						© {new Date().getFullYear()} Jared Wyce. All Rights Reserved.
					</Text>
				</Stack>
			</Stack>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Home);
