import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Stack,
	useColorModeValue,
} from 'native-base';
import React from 'react';
import { AuthNavProps } from 'src/types/AuthParamList';

import { Hero } from '../../components/onboarding/Hero';
import { Onboarding } from '../../components/onboarding/Onboarding';

export const Index: React.FC<AuthNavProps<'Index'>> = ({ navigation }) => {
	//TODO: test on various screen sizes
	return (
		<Box bg={useColorModeValue('warmGray.50', 'warmGray.800')} minH="100%">
			<Box
				style={{
					position: 'absolute',
					top: 0,
					left: -100,
				}}
			>
				<Hero />
			</Box>
			<Stack
				flex={1}
				alignItems="center"
				justifyContent="space-between"
				pt="16"
			>
				<Stack space={2} alignItems="center">
					<Image
						source={require('../../../assets/images/koi-icon.png')}
						alt="logo"
						size="xl"
					/>

					<Heading fontSize="3xl">Koi Anime List</Heading>
				</Stack>

				<Onboarding />

				<Box mb={20}>
					<HStack alignItems="center" space={5} ml={5} mr={10}>
						<Button
							h="12"
							w="50%"
							colorScheme="trueGray"
							_text={{ fontSize: 'lg' }}
							onPress={() => navigation.navigate('Login')}
						>
							Log in
						</Button>
						<Button
							h="12"
							w="50%"
							_text={{ fontSize: 'lg' }}
							onPress={() => navigation.navigate('Register')}
						>
							Sign up
						</Button>
					</HStack>
				</Box>
			</Stack>
		</Box>
	);
};
