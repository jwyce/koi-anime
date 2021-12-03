import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { SiBuymeacoffee } from 'react-icons/si';

import {
	Avatar,
	Button,
	Divider,
	Heading,
	HStack,
	Link,
	Stack,
	Text,
	useColorMode,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';

import appStore from '../assets/images/app-store-badge.svg';
import googlePlay from '../assets/images/google-play-badge.svg';
import logo from '../assets/images/koi-icon.svg';
import hero from '../assets/images/stacked-steps-haikei.svg';
import { Layout } from '../components/Layout';
import { FeedbackIcon } from '../components/styles/CustomIcons';
import { withApollo } from '../stores/withApollo';

import type { NextPage } from 'next';
import { HeartIcon } from '../components/styles/HeartIcon';
const Home: NextPage = () => {
	const { colorMode } = useColorMode();

	return (
		<Layout variant="full" noMargin={true}>
			<NextSeo
				title="Home - Koi Anime"
				description="A short description goes here."
			/>

			<div style={{ backgroundImage: `url(${hero.src})` }}>
				<HStack pt={20} pb={20} justify="center">
					<Image src={logo} alt="logo" height="150em" width="150em" />
					<Stack pl={10} align="center">
						<Heading as="h1" fontSize="6xl" color="white">
							Koi Anime List
						</Heading>
						<Heading as="h6" fontSize="medium" color="white">
							v0.0.1
						</Heading>
						<Text fontSize="lg" color="white">
							Simple and complete testing utilities that encourage good testing
							practices
						</Text>
					</Stack>
				</HStack>
			</div>

			<section style={{ position: 'relative' }}>
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						left: 0,
						width: '100%',
						overflow: 'hidden',
						lineHeight: 0,
						transform: 'rotate(180deg)',
					}}
				>
					<svg
						style={{
							position: 'relative',
							display: 'block',
							width: 'calc(173% + 1.3px)',
							height: '87px',
						}}
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<path
							d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
							fill={colorMode === 'dark' ? '#1a202c' : '#fff'}
						></path>
					</svg>
				</div>
			</section>

			<Stack spacing="10">
				<HStack align="center">
					<Stack align="center" p={5}>
						<Text fontSize="larger">description + download</Text>
						<Wrap>
							<WrapItem>
								<Link href="https://jwyce.github.io/portfolio/">
									<Image
										src={appStore}
										alt="app store"
										width="200em"
										height="80em"
									/>
								</Link>
							</WrapItem>
							<WrapItem>
								<Image
									src={googlePlay}
									alt="google play"
									width="220em"
									height="85em"
								/>
							</WrapItem>
						</Wrap>
					</Stack>
				</HStack>

				<HeartIcon rank={4} size={36} />

				<Stack align="center" p={5}>
					<Text fontSize="2xl" fontWeight="bolder">
						Contact
					</Text>
					<Text fontSize="lg">
						See the GitHub project to contribute, considering supporting our
						work, or send us feeback to improve.
					</Text>
					<Wrap>
						<WrapItem>
							<Link href="https://jwyce.github.io/portfolio/">
								<Button
									leftIcon={<AiFillGithub fontSize={24} />}
									colorScheme="teal"
									variant="solid"
								>
									Project repo
								</Button>
							</Link>
						</WrapItem>
						<WrapItem>
							<Button
								leftIcon={<SiBuymeacoffee fontSize={24} />}
								colorScheme="teal"
							>
								Buy me a coffee
							</Button>
						</WrapItem>
						<WrapItem>
							<Button
								leftIcon={<FeedbackIcon fontSize={24} />}
								colorScheme="teal"
							>
								Send feedback
							</Button>
						</WrapItem>
					</Wrap>
				</Stack>

				<Stack align="center" p={5}>
					<Text fontSize="2xl" fontWeight="bolder">
						Contributors
					</Text>
					<Text fontSize="lg">
						This project exists thanks to all the people who contribute:
					</Text>
					<Wrap>
						<WrapItem>
							<Link href="https://jwyce.github.io/portfolio/">
								<Avatar
									name="Jared Wyce"
									src="https://avatars.githubusercontent.com/u/16946573?v=4"
								/>
							</Link>
						</WrapItem>
						<WrapItem>
							<Avatar
								name="Abbey Hebler"
								src="https://bit.ly/tioluwani-kolawole"
							/>
						</WrapItem>
					</Wrap>
				</Stack>

				<Divider pt={5} />
				<Stack align="center" pb={5}>
					<Image src={logo} alt="logo" height="100em" width="100em" />
					<Text fontSize="md">
						© {new Date().getFullYear()} Jared Wyce. All Rights Reserved.
					</Text>
				</Stack>
			</Stack>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Home);
