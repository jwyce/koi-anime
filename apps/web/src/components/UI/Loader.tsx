import { Center } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import React from 'react';

interface LoaderProps {
	size: 'xl' | 'xs' | 'sm' | 'md' | 'lg' | undefined;
}

export const Loader: React.FC<LoaderProps> = ({ size }) => {
	return (
		<Center height="100%">
			<Spinner size={size} color="#ff6250" />
		</Center>
	);
};
