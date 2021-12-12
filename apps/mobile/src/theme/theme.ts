import { extendTheme } from 'native-base';

export const theme = extendTheme({
	colors: {
		primary: {
			300: '#fa9e68',
			400: '#fa8368',
			500: '#fa7268',
			600: '#e85c66',
			700: '#d54664',
			800: '#b0235f',
			900: '#5f0c48',
		},
	},
	config: {
		// Changing initialColorMode to 'dark'
		initialColorMode: 'dark',
	},
});
