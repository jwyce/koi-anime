export const components = {
	Surface: {
		baseStyle: ({ colorMode }: any) => ({
			bg: colorMode === 'dark' ? 'gray.700' : 'white',
			borderRadius: '10',
			padding: '5',
		}),
	},
};
