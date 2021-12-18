import { NextSeo } from 'next-seo';
import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';

import { Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import logo from '../assets/images/koi-icon.svg';
import { Layout } from '../components/Layout/Layout';
import { withApollo } from '../stores/withApollo';

import type { NextPage } from 'next';
export const FourOhFour: NextPage = ({}) => {
	return (
		<Layout variant="small">
			<NextSeo
				title="404 - Koi Anime"
				description="A short description goes here."
			/>
			<Box h="80%" display="flex" alignItems="center" justifyContent="center">
				<Stack align="center" justify="center">
					<HStack justify="center">
						<Heading as="h1" fontSize="10em" pr={3}>
							4
						</Heading>
						<Image src={logo} alt="logo" height="120em" width="120em" />
						<Heading as="h1" fontSize="10em">
							4
						</Heading>
					</HStack>
					<Text fontSize="sm" opacity={0.6}>
						Sorry the requested page unfortunately couldn't be found.
					</Text>
					<NextLink href="/">
						<Button leftIcon={<AiFillHome size={24} />} colorScheme="teal">
							Go home
						</Button>
					</NextLink>
				</Stack>
			</Box>
		</Layout>
	);
};
export default withApollo({ ssr: false })(FourOhFour);
