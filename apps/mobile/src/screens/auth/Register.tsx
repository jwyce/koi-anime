import { Center, Text } from 'native-base';
import React from 'react';
import { AuthNavProps } from 'src/types/AuthParamList';

export const Register: React.FC<AuthNavProps<'Register'>> = ({}) => {
	return (
		<Center>
			<Text>Register Screen</Text>
		</Center>
	);
};
