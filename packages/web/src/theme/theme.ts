import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true,
};

export const theme = extendTheme({
	config,
	styles: {
		global: (props: any) => ({
			body: {
				fontFamily: 'body',
				color: mode('gray.800', 'whiteAlpha.900')(props),
				bg: mode('white', 'gray.800')(props),
				lineHeight: 'base',
			},
		}),
	},
	colors: {
		primary: {
			light: '#FF8450',
			medium: '#ff6250',
			dark: '#891F00',
		},
		secondary: {
			light: '#A4A7DE',
			dark: '#555B8C',
		},
		status: {
			success: '#00C7B4',
			info: '#659FFF',
			warning: '#EC9200',
			error: '#EB79FA',
		},
	},
});

export default theme;
