import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { GiCirclingFish } from 'react-icons/gi';
import { IoSettings, IoLogOut, IoLogIn } from 'react-icons/io5';

import { useApolloClient } from '@apollo/client';
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
	Spacer,
	MenuList,
	Tooltip,
} from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@koi/controller';

import logo from '../assets/images/koi-icon.svg';
import { isServer } from '../utils/isServer';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const [logout] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const { data, loading } = useMeQuery({ skip: isServer() }); // could remove if I want the request to be done server side
	let body = null;

	// data is loading
	if (loading) {
		console.log('loading');
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
				<Button>My Library</Button>
				<Spacer mr={2} />
				<Button>Vote</Button>
				<Spacer mr={2} />
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
						Browse
					</MenuButton>
					<MenuList>
						<MenuItem>Anime</MenuItem>
						<MenuItem>Manga</MenuItem>
					</MenuList>
				</Menu>
				<Spacer mr={2} />
				<Menu>
					<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
						Rankings
					</MenuButton>
					<MenuList>
						<MenuItem>Top Anime</MenuItem>
						<MenuItem>Top Manga</MenuItem>
						<MenuItem>Best Boy</MenuItem>
						<MenuItem>Best Girl</MenuItem>
						<MenuItem>Top Openings</MenuItem>
						<MenuItem>Top Endings</MenuItem>
					</MenuList>
				</Menu>
				<Spacer mr={2} />
				<Menu>
					<Tooltip label={data.me.username}>
						<MenuButton>
							<Avatar
								icon={<GiCirclingFish fontSize="1.5rem" />}
								mr={2}
								size="md"
								bg="primary.medium"
								color="white"
							/>
						</MenuButton>
					</Tooltip>
					<MenuList>
						<MenuItem icon={<IoSettings size={24} />}>Settings</MenuItem>
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
		<Flex position="sticky" top={0} zIndex={1} bg="primary.light" p={1}>
			<Flex flex={1} m="auto" align="center" pl={5} pr={5}>
				<NextLink href="/">
					<Link style={{ textDecoration: 'none' }}>
						<Flex flex={1} alignItems="center" justifyContent="flex-start">
							<Image src={logo} alt="logo" height="40px" width="40px" />
							<Heading as="h2" size="md" ml={2} color="white">
								Koi Anime
							</Heading>
						</Flex>
					</Link>
				</NextLink>
				<Box ml={'auto'}>{body}</Box>
			</Flex>
		</Flex>
	);
};
