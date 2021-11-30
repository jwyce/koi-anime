export const components = {
	Surface: {
		baseStyle: ({ colorMode }: any) => ({
			bg: colorMode === 'dark' ? 'gray.700' : 'orange.50',
			borderRadius: '10',
			padding: '5',
		}),
	},
};
