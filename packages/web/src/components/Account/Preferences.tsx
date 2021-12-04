import React, { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Select,
	SimpleGrid,
	Stack,
	Switch,
	Text,
	useColorMode,
} from '@chakra-ui/react';

import { profileColor, profileIcon } from '../../utils/profilePreferences';
import {
	TitlePreference,
	ProfileColor,
	ProfileIcon,
	DefaultUserFragment,
} from '@koi/controller';

interface PreferencesProps {
	me: DefaultUserFragment | undefined | null;
}

export const Preferences: React.FC<PreferencesProps> = ({ me }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const [color, setColor] = useState<string>('');
	const [icon, setIcon] = useState<string>('');

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
		icon: profileIcon(value, 24),
	}));
	return (
		<>
			<Stack spacing="5">
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
							Site Theme
						</FormLabel>
						<Button
							leftIcon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
							onClick={toggleColorMode}
						>
							{colorMode === 'dark' ? 'Dark' : 'Light'}
						</Button>
					</SimpleGrid>
				</FormControl>
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
							Username
						</FormLabel>
						<Input defaultValue={me?.username} />
					</SimpleGrid>
				</FormControl>
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
							Email
						</FormLabel>
						<Input defaultValue={me?.email} />
					</SimpleGrid>
				</FormControl>
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
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
					</SimpleGrid>
				</FormControl>
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
							Profile Color
						</FormLabel>
						<Menu>
							<MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
								{color ? (
									<HStack spacing="1">
										<Box mr={3}>
											<BsCircleFill
												size={24}
												color={profileColor(color) ?? 'transparent'}
											/>
										</Box>
										<Text textTransform="capitalize">{color}</Text>
									</HStack>
								) : (
									<HStack>
										<span>Select Color</span>
									</HStack>
								)}
							</MenuButton>
							<MenuList overflowY="scroll" maxH="60">
								{profileColorList.map((x, idx) => (
									<MenuItem
										icon={
											<BsCircleFill
												size={24}
												color={profileColor(x.value) ?? 'transparent'}
											/>
										}
										key={idx}
										onClick={() => setColor(x.text)}
									>
										{x.text}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					</SimpleGrid>
				</FormControl>
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
							Profile Icon
						</FormLabel>
						<Menu>
							<MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
								{icon ? (
									<HStack spacing="1">
										<Box mr={3}>{profileIcon(icon, 24)}</Box>
										<Text textTransform="capitalize">{icon}</Text>
									</HStack>
								) : (
									<HStack>
										<span>Select Icon</span>
									</HStack>
								)}
							</MenuButton>
							<MenuList overflowY="scroll" maxH="60">
								{profileIconList.map((x, idx) => (
									<MenuItem
										icon={x.icon ?? undefined}
										key={idx}
										onClick={() => setIcon(x.text)}
									>
										{x.text}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
					</SimpleGrid>
				</FormControl>
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0">
							Show Adult Content
						</FormLabel>
						<Switch id="nsfw" colorScheme="teal" size="lg" />
					</SimpleGrid>
				</FormControl>
			</Stack>
			<Button size="lg" width="100%" colorScheme="teal" mt={5}>
				Update Profile
			</Button>
		</>
	);
};
