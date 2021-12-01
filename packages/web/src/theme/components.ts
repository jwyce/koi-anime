export const components = {
	Surface: {
		baseStyle: ({ colorMode }: any) => ({
			bg: colorMode === 'dark' ? 'gray.700' : 'gray.100',
			borderRadius: '10',
			padding: '5',
		}),
	},
};
