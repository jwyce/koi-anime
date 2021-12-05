import { useColorModeValue } from 'native-base';
import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { ForgotPassword } from '../screens/auth/ForgotPassword';
import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';
import { Welcome } from '../screens/auth/Welcome';
import { AuthParamList } from '../types/AuthParamList';

const Stack = createStackNavigator<AuthParamList>();
export const AuthStack: React.FC<{}> = ({}) => {
	return (
		<Stack.Navigator initialRouteName="Welcome">
			<Stack.Screen
				name="Welcome"
				component={Welcome}
				options={{
					header: () => null,
					headerBackground: useColorModeValue('warmGray.50', 'coolGray.800'),
				}}
			/>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
		</Stack.Navigator>
	);
};
