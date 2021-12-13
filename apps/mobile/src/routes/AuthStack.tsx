import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { Header } from '../components/layout/Header';
import { Login } from '../screens/auth/Login';
import { Register } from '../screens/auth/Register';
import { Index } from '../screens/auth/Index';
import { AuthParamList } from '../types/AuthParamList';

const Stack = createStackNavigator<AuthParamList>();
export const AuthStack: React.FC<{}> = ({}) => {
	return (
		<Stack.Navigator initialRouteName="Index">
			<Stack.Screen
				name="Index"
				component={Index}
				options={{
					header: () => null,
				}}
			/>
			<Stack.Screen
				name="Login"
				component={Login}
				options={{
					header: (props) => <Header {...props} />,
				}}
			/>
			<Stack.Screen
				name="Register"
				component={Register}
				options={{
					header: (props) => <Header {...props} />,
				}}
			/>
		</Stack.Navigator>
	);
};
