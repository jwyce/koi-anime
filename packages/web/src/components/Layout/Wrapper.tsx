import { Box } from '@chakra-ui/react';
import React from 'react';

export type WrapperVariant = 'small' | 'regular' | 'full';

interface WrapperProps {
	variant?: WrapperVariant;
	noMargin?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
	children,
	variant = 'regular',
	noMargin = false,
}) => {
	return (
		<Box
			mt={noMargin ? 0 : 8}
			mx="auto"
			maxW={
				variant === 'regular' ? '800px' : variant === 'full' ? 'none' : '400px'
			}
			w="100%"
			h="calc(100vh - 88px)"
		>
			{children}
		</Box>
	);
};
