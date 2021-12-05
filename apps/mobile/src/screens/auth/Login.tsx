import { Box, Center, Text, useColorModeValue } from 'native-base';
import React from 'react';
import { AuthNavProps } from 'src/types/AuthParamList';

export const Login: React.FC<AuthNavProps<'Login'>> = ({}) => {
	return (
		<Center flex={1} bg={useColorModeValue('warmGray.50', 'coolGray.800')}>
			<Box p={4} bg="primary.500">
				<Text>Login Screen</Text>
			</Box>
		</Center>
	);
};
