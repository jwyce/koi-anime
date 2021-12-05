import {
	Box,
	Center,
	Heading,
	HStack,
	Image,
	Stack,
	Text,
	useColorModeValue,
} from 'native-base';
import React from 'react';
import { AuthNavProps } from 'src/types/AuthParamList';

export const Welcome: React.FC<AuthNavProps<'Welcome'>> = ({}) => {
	return (
		<Box
			bg={useColorModeValue('warmGray.50', 'coolGray.800')}
			safeArea
			minH="100%"
		>
			<Stack alignItems="center" pt={5}>
				<HStack space={5} alignItems="center">
					<Image
						source={require('../../../assets/images/koi-icon.png')}
						alt="logo"
						size="lg"
					/>

					<Heading fontSize="4xl">Koi Anime List</Heading>
				</HStack>
			</Stack>
		</Box>
	);
};
