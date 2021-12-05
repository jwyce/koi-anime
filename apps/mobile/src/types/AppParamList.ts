import { RouteProp } from '@react-navigation/core';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type AppParamList = {
	Home: undefined;
	Search: undefined;
	Rate: undefined;
	Settings: undefined;
};

export type AppNavProps<T extends keyof AppParamList> = {
	navigation: BottomTabNavigationProp<AppParamList, T>;
	route: RouteProp<AppParamList, T>;
};
