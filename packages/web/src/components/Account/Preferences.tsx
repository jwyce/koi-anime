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
	useToast,
} from '@chakra-ui/react';

import { profileColor, profileIcon } from '../../utils/profilePreferences';
import {
	TitlePreference,
	ProfileColor,
	ProfileIcon,
	DefaultUserFragment,
	useUpdatePreferencesMutation,
} from '@koi/controller';
import { Controller, useForm } from 'react-hook-form';

interface PreferencesProps {
	me: DefaultUserFragment;
}

export const Preferences: React.FC<PreferencesProps> = ({ me }) => {
	const toast = useToast();
	const { colorMode, toggleColorMode } = useColorMode();
	const [updatePreferences] = useUpdatePreferencesMutation();

	const [color, setColor] = useState<string>(me.profileColor!.toLowerCase());
	const [icon, setIcon] = useState<string>(me.profileIcon!.toLowerCase());
	const [nsfw, setNSFW] = useState<boolean>(me.showNSFW);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: me.username,
			email: me.email,
			titlePreference: me.titlePreference.toLowerCase(),
			showNSFW: me.showNSFW,
		},
	});

	const onSubmit = async (data: any) => {
		const response = await updatePreferences({
			variables: {
				options: {
					username: me.username === data.username ? null : data.username,
					email: me.email === data.email ? null : data.email,
					titlePreference:
						data.titlePreference.toUpperCase() as TitlePreference,
					profileColor: color.toUpperCase() as ProfileColor,
					profileIcon: icon.toUpperCase() as ProfileIcon,
					showNSFW: nsfw,
				},
			},
		});

		if (response.data?.updatePreferences.errors) {
			toast({
				title: response.data?.updatePreferences.errors[0].field,
				variant: 'left-accent',
				description: response.data?.updatePreferences.errors[0].message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'Updated Preferences',
				position: 'bottom-right',
				variant: 'left-accent',
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		}
	};

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
			<form onSubmit={handleSubmit(onSubmit)}>
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
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<FormControl>
								<SimpleGrid columns={2} spacing={10}>
									<FormLabel htmlFor="username" mb="0" whiteSpace="nowrap">
										Username
									</FormLabel>
									<Input {...field} />
								</SimpleGrid>
							</FormControl>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<FormControl>
								<SimpleGrid columns={2} spacing={10}>
									<FormLabel htmlFor="email" mb="0" whiteSpace="nowrap">
										Email
									</FormLabel>
									<Input {...field} />
								</SimpleGrid>
							</FormControl>
						)}
					/>
					<Controller
						name="titlePreference"
						control={control}
						render={({ field }) => (
							<FormControl>
								<SimpleGrid columns={2} spacing={10}>
									<FormLabel
										htmlFor="titlePreference"
										mb="0"
										whiteSpace="nowrap"
									>
										Title Preference
									</FormLabel>

									<Select {...field}>
										{titlePrefList.map((x, idx) => (
											<option key={idx} value={x.value}>
												{x.text}
											</option>
										))}
									</Select>
								</SimpleGrid>
							</FormControl>
						)}
					/>
					<FormControl>
						<SimpleGrid columns={2} spacing={10}>
							<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
								Profile Color
							</FormLabel>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon />}
									w="100%"
								>
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
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon />}
									w="100%"
								>
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
								Show Adult Content 😏
							</FormLabel>
							<Switch
								id="nsfw"
								colorScheme="teal"
								size="lg"
								isChecked={nsfw}
								onChange={(e) => setNSFW(e.target.checked)}
							/>
						</SimpleGrid>
					</FormControl>
				</Stack>
				<Button type="submit" size="lg" width="100%" colorScheme="teal" mt={5}>
					Update Profile
				</Button>
			</form>
		</>
	);
};
