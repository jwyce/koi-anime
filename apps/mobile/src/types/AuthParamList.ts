import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
export type AuthParamList = {
	Welcome: undefined;
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
	navigation: StackNavigationProp<AuthParamList, T>;
	route: RouteProp<AuthParamList, T>;
};
