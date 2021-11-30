import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import { components } from './components';

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
			'&::selection': {
				background: '#ff6250',
				color: '#fff',
			},
			'&::-webkit-scrollbar': mode(
				{},
				{
					width: '10px',
					height: '10px',
				}
			)(props),
			'&::-webkit-scrollbar-thumb': mode(
				{},
				{
					borderRadius: '10px',
					background: '#575757',
				}
			)(props),
			'&::-webkit-scrollbar-thumb:hover': mode(
				{},
				{
					borderRadius: '10px',
					background: '#666',
				}
			)(props),
			'&::-webkit-scrollbar-track': mode(
				{},
				{
					borderRadius: '10px',
					background: 'rgba(255, 255, 255, 0)',
				}
			)(props),
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
		brand: {
			100: mode('#ddd', '#444ace'),
		},
	},
	components,
});

export default theme;
