import { Center, Spinner } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext } from '../AuthProvider';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';
import { appBackgroundColor } from '../utils/appBackgroundColor';

interface RoutesProps {
	theme: any;
}

export const Routes: React.FC<RoutesProps> = ({ theme }) => {
	const { user, login } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// check if user is logged in or not
		AsyncStorage.clear();
		AsyncStorage.getItem('user')
			.then((userString) => {
				console.log(userString);
				if (userString) {
					// decode it
					console.log('login');
					// login();
				}
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (loading) {
		return (
			<Center flex={1} bg={appBackgroundColor()}>
				<Spinner size="lg" color="primary.500" />
			</Center>
		);
	}

	return (
		<NavigationContainer theme={theme}>
			{user ? <AppTabs /> : <AuthStack />}
		</NavigationContainer>
	);
};
