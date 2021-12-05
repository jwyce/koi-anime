import { Center, Text } from 'native-base';
import React from 'react';
import { AuthNavProps } from 'src/types/AuthParamList';

export const ForgotPassword: React.FC<AuthNavProps<'ForgotPassword'>> =
	({}) => {
		return (
			<Center>
				<Text>Forgot Password Screen</Text>
			</Center>
		);
	};
