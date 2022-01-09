import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { IoLogIn, IoLogOut, IoSettings } from 'react-icons/io5';

import { useApolloClient } from '@apollo/client';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Link,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Tooltip,
	Text,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@koi/controller';

import logo from '../../assets/images/koi-icon.svg';
import { isServer } from '../../utils/isServer';
import { profileIcon, profileColor } from '../../utils/profilePreferences';
import { MobileHamburger } from './MobileHamburger';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [logout] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const router = useRouter();
	const { data, loading } = useMeQuery({ skip: isServer() }); // could remove if I want the request to be done server side
	let body = null;

	// data is loading
	if (loading) {
		body = <Button isLoading={true}></Button>;
	} else if (!data?.me) {
		// user not logged in
		body = (
			<NextLink href="/login">
				<Button leftIcon={<IoLogIn size={24} />}>Login</Button>
			</NextLink>
		);
	} else {
		// user is logged in
		body = (
			<Flex align="center">
				<Flex display={['none', 'none', 'flex']}>
					<NextLink href={`/users/${data.me.username}/library`}>
						<a>
							<Button>My Library</Button>
						</a>
					</NextLink>
					<Spacer mr={2} />
					<NextLink href="/vote/anime">
						<a>
							<Button>Vote</Button>
						</a>
					</NextLink>
					<Spacer mr={2} />
					<Menu>
						<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
							Browse
						</MenuButton>
						<MenuList>
							<MenuItem>
								<NextLink href="/browse/anime">
									<a style={{ width: '100%' }}>Anime</a>
								</NextLink>
							</MenuItem>
							<MenuItem>
								<NextLink href="/browse/manga">
									<a style={{ width: '100%' }}>Manga</a>
								</NextLink>
							</MenuItem>
						</MenuList>
					</Menu>
					<Spacer mr={2} />
					<NextLink href={`/top-rated/anime`}>
						<a>
							<Button>
								<Text fontWeight={100}>🏆</Text> Top Rated
							</Button>
						</a>
					</NextLink>
					<Spacer mr={2} />
				</Flex>
				<Menu>
					<Tooltip label={data.me.username}>
						<MenuButton>
							<Avatar
								icon={profileIcon(data.me!.profileIcon, '1.5rem')!}
								size="md"
								mr={2}
								bg={profileColor(data.me!.profileColor)!}
								color="white"
							/>
						</MenuButton>
					</Tooltip>
					<MenuList>
						<MenuItem
							icon={<IoSettings size={24} />}
							onClick={() => router.push('/settings')}
						>
							Settings
						</MenuItem>
						<MenuItem
							icon={<IoLogOut size={24} />}
							onClick={async () => {
								await logout();
								await apolloClient.resetStore();
							}}
						>
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			</Flex>
		);
	}

	return (
		<>
			<MobileHamburger
				isOpen={isOpen}
				onClose={onClose}
				username={data?.me?.username ?? ''}
			/>
			<Flex
				position="sticky"
				top={0}
				zIndex={isOpen ? 500 : 9999}
				bg="primary.light"
				p={1}
			>
				<Flex flex={1} m="auto" align="center" pl={5} pr={5}>
					<Flex display={['flex', 'flex', 'none']}>
						<IconButton
							aria-label="hamburger"
							icon={<HamburgerIcon />}
							mr={2}
							size="lg"
							onClick={onOpen}
						/>
					</Flex>
					<NextLink href="/">
						<a>
							<Link style={{ textDecoration: 'none' }}>
								<Flex flex={1} alignItems="center" justifyContent="flex-start">
									<Image src={logo} alt="logo" height="40px" width="40px" />
									<Heading as="h2" size="md" ml={2} color="white">
										Koi Anime
									</Heading>
								</Flex>
							</Link>
						</a>
					</NextLink>
					<Box ml={'auto'}>{body}</Box>
				</Flex>
			</Flex>
		</>
	);
};
