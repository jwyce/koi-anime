import { useColorModeValue } from 'native-base';

export const appBackgroundColor = () => {
	return useColorModeValue('#fafaf9', '#292524');
};

export const appForegroundColor = () => {
	return useColorModeValue('#000', '#fff');
};
