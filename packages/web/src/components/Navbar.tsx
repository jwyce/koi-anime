import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';
import { GiCirclingFish } from 'react-icons/gi';
import { IoSettings, IoLogOut } from 'react-icons/io5';

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
	MenuList,
	Tooltip,
} from '@chakra-ui/react';
import { useLogoutMutation, useMeQuery } from '@koi/controller';

import logo from '../assets/images/koi-icon.svg';
import { isServer } from '../utils/isServer';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	const [logout] = useLogoutMutation();
	const apolloClient = useApolloClient();
	const { data, loading } = useMeQuery({ skip: isServer() }); // could remove if I want the request to be done server side
	let body = null;

	// data is loading
	if (loading) {
		body = <div>loading...</div>;
	} else if (!data?.me) {
		// user not logged in
		body = (
			<>
				<NextLink href="/login">
					<Link mr={2}>login</Link>
				</NextLink>

				<NextLink href="/register">
					<Link>register</Link>
				</NextLink>
			</>
		);
	} else {
		// user is logged in
		body = (
			<Flex align="center">
				<NextLink href="/create-post">
					<Button mr={4} as={Link}>
						create post
					</Button>
				</NextLink>
				<Menu>
					<Tooltip label={data.me.username}>
						<MenuButton>
							<Avatar
								onClick={() => alert('hi')}
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
					<Link>
						<Flex flex={1} alignItems="center" justifyContent="flex-start">
							<Image src={logo} alt="logo" height="40px" width="40px" />
							<Heading as="h2" size="md" ml={2}>
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
