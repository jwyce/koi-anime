import { NextSeo } from 'next-seo';
import NextLink from 'next/link';
import Image from 'next/image';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { SiBuymeacoffee } from 'react-icons/si';

import {
	Alert,
	Avatar,
	Badge,
	Box,
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
import { useMeQuery } from '@koi/controller';

import fire from '../assets/images/fire.svg';
import appStore from '../assets/images/app-store-badge.svg';
import googlePlay from '../assets/images/google-play-badge.svg';
import logo from '../assets/images/koi-icon.svg';
import mascot from '../assets/images/yui-rin.png';
import hero from '../assets/images/stacked-steps-haikei.svg';
import { Layout } from '../components/Layout/Layout';
import { FeedbackIcon } from '../components/UI/CustomIcons';
import { Loader } from '../components/UI/Loader';
import { withApollo } from '../stores/withApollo';
import { isServer } from '../utils/isServer';

import type { NextPage } from 'next';
import { IoLogIn, IoSearch } from 'react-icons/io5';
const Home: NextPage = () => {
	const { colorMode } = useColorMode();
	const { data, loading } = useMeQuery({ skip: isServer() }); // could remove if I want the request to be done server side

	if (loading) {
		return (
			<Layout>
				<Loader size="xl" />
			</Layout>
		);
	}

	return (
		<Layout variant="full" noMargin={true}>
			<NextSeo
				title="Home - Koi Anime"
				description="A short description goes here."
			/>

			<div style={{ backgroundImage: `url(${hero.src})` }}>
				<Stack
					pt={20}
					pb={20}
					justify="center"
					align="center"
					direction={['column', 'column', 'row', 'row']}
					px={2}
				>
					<Image src={logo} alt="logo" height="150em" width="150em" />
					<Stack pl={[0, 0, 0, 10]} align="center">
						<Heading
							as="h1"
							fontSize={['3xl', '6xl', '6xl', '6xl']}
							color="white"
						>
							Koi Anime List
						</Heading>
						<HStack spacing={2}>
							<Heading as="h6" fontSize="lg" color="white">
								v0.1.14
							</Heading>
							<Badge colorScheme="purple" fontSize="lg" ml={2}>
								PREVIEW
							</Badge>
						</HStack>
						<Text
							fontSize="lg"
							color="white"
							fontWeight={500}
							textAlign="center"
						>
							Simple anime and manga tracker with a unique and accurate rating
							system
						</Text>
					</Stack>
				</Stack>
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
							fill={colorMode === 'dark' ? '#1a202c' : '#edf2f7'}
						></path>
					</svg>
				</div>
			</section>

			<Stack spacing="10" px={2}>
				<Stack
					align="center"
					justify="center"
					direction={['column', 'column', 'column', 'row']}
					p={[5, 3, 3, 0]}
				>
					<Alert
						colorScheme="purple"
						variant="left-accent"
						borderRadius={6}
						p={5}
						w={['20em', '30rem']}
					>
						<Stack align="center">
							<HStack spacing={2}>
								<Image src={fire} alt="fire" height="25em" width="25em" />
								<Text fontSize={['lg', '3xl']} fontWeight="bolder">
									{/* Get the app */}
									App coming soon...
								</Text>
							</HStack>
							<Wrap justify="center" w={['12em', '100%']}>
								<WrapItem>
									<NextLink href="/">
										<a>
											<Image
												src={appStore}
												alt="app store"
												width="200em"
												height="80em"
											/>
										</a>
									</NextLink>
								</WrapItem>
								<WrapItem>
									<NextLink href="/">
										<a>
											<Image
												src={googlePlay}
												alt="google play"
												width="220em"
												height="80em"
											/>
										</a>
									</NextLink>
								</WrapItem>
							</Wrap>
							{data?.me ? (
								<NextLink href="/browse/anime">
									<Button
										size="lg"
										bg="black"
										color="white"
										_hover={{ bg: 'black' }}
										leftIcon={<IoSearch size={24} />}
									>
										Browse anime
									</Button>
								</NextLink>
							) : (
								<NextLink href="/register">
									<Button
										size="lg"
										bg="black"
										color="white"
										_hover={{ bg: 'black' }}
										leftIcon={<IoLogIn size={24} />}
									>
										Create account
									</Button>
								</NextLink>
							)}
						</Stack>
					</Alert>
					<Box clipPath="ellipse(600px 540px at top)" userSelect="none">
						<Image src={mascot} alt="yui-rin" width="900em" height="538em" />
					</Box>
				</Stack>

				<Stack align="center" px={[3, 3]} textAlign="center">
					<Text fontSize="2xl" fontWeight="bolder">
						Contact
					</Text>
					<Text fontSize="lg">
						See the GitHub project to contribute, considering supporting our
						work, or send us feeback to improve.
					</Text>
					<Wrap justify="center">
						<WrapItem>
							<Button
								leftIcon={<AiFillGithub fontSize={24} />}
								colorScheme="teal"
								onClick={() =>
									window.open('https://jwyce.github.io/portfolio/', '_blank')
								}
							>
								GitHub Project
							</Button>
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
								onClick={() => window.open('mailto:wycejared@gmail.com')}
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
					<Text fontSize="lg" textAlign="center">
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
							<Link href="https://www.fiverr.com/mapo_tofus">
								<Avatar
									name="mapo_tofus"
									src="https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/2d376e3ed64d52de6fb650c133cbba0e-1614885466046/cb62f6ae-e6b6-482e-a3b2-8fc662358665.png"
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
