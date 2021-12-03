import { NextSeo } from 'next-seo';
import React from 'react';
import { GiCirclingFish } from 'react-icons/gi';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
	Avatar,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Select,
	Spacer,
	Stack,
	Switch,
	useColorMode,
} from '@chakra-ui/react';
import {
	useMeQuery,
	TitlePreference,
	ProfileColor,
	ProfileIcon,
} from '@koi/controller';

import { Layout } from '../components/Layout';
import { withApollo } from '../stores/withApollo';
import { isServer } from '../utils/isServer';

export const Settings: React.FC<{}> = ({}) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { data, loading } = useMeQuery({ skip: isServer() });

	const titlePrefList = Object.values(TitlePreference).map((value) => ({
		text: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
		value: value.toLowerCase(),
	}));
	const profileColorList = Object.values(ProfileColor).map((value) => ({
		text: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
		value: value.toLowerCase(),
	}));
	const profileIconList = Object.values(ProfileIcon).map((value) => ({
		text: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
		value: value.toLowerCase(),
	}));
	console.log(titlePrefList);

	if (loading) return <div>loading...</div>;

	return (
		<Layout>
			<NextSeo
				title="Settings - Koi Anime"
				description="A short description goes here."
			/>
			<HStack spacing={10}>
				<Avatar
					icon={<GiCirclingFish fontSize="3.5rem" />}
					size="xl"
					bg="primary.medium"
					color="white"
				/>
				<Heading as="h2" fontSize="4xl">
					{data?.me?.username}'s Settings
				</Heading>
			</HStack>

			<Spacer mt={3} />

			<Stack spacing={10}>
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
						Site Theme
					</FormLabel>
					<Button
						leftIcon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
						onClick={toggleColorMode}
					>
						{colorMode === 'dark' ? 'Dark' : 'Light'}
					</Button>
				</FormControl>
				// TODO: add username, email, account confirmation, change password
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
						Title Preference
					</FormLabel>
					<Select>
						{titlePrefList.map((x, idx) => (
							<option key={idx} value={x.value}>
								{x.text}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
						Profile Color
					</FormLabel>
					<Select>
						{profileColorList.map((x, idx) => (
							<option key={idx} value={x.value}>
								{x.text}
							</option>
						))}
					</Select>
				</FormControl>
				// TODO: customize color and icon dropdown
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
						Profile Icon
					</FormLabel>
					<Select>
						{profileIconList.map((x, idx) => (
							<option key={idx} value={x.value}>
								{x.text}
							</option>
						))}
					</Select>
				</FormControl>
				<FormControl display="flex" alignItems="center">
					<FormLabel htmlFor="email-alerts" mb="0">
						Show Adult Content
					</FormLabel>
					<Switch id="nsfw" colorScheme="teal" size="lg" />
				</FormControl>
			</Stack>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Settings);
