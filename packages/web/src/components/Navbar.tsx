import NextLink from 'next/link';
import React from 'react';

import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';

import { useMeQuery } from '@koi/controller';
import { isServer } from '../utils/isServer';
// import { useApolloClient } from '@apollo/client';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
	// const [logout, { loading: logoutLoading }] = useLogoutMutation();
	// const apolloClient = useApolloClient();
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
				<Box mr={2}>{data.me.username}</Box>
				<Button
					onClick={async () => {
						// await logout();
						// await apolloClient.resetStore();
					}}
					variant="link"
					// isLoading={logoutLoading}
				>
					logout
				</Button>
			</Flex>
		);
	}

	return (
		<Flex position="sticky" top={0} zIndex={1} bg="#d5815a" p={4}>
			<Flex flex={1} m="auto" align="center" maxW={800}>
				<NextLink href="/">
					<Link>
						<Heading as="h2" size="lg">
							Koi Anime
						</Heading>
					</Link>
				</NextLink>
				<Box ml={'auto'}>{body}</Box>
			</Flex>
		</Flex>
	);
};
