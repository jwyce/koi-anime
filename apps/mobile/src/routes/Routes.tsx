import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';

interface RoutesProps {
	theme: any;
}

export const Routes: React.FC<RoutesProps> = ({ theme }) => {
	return (
		<NavigationContainer theme={theme}>
			<AuthStack />
		</NavigationContainer>
	);
};
