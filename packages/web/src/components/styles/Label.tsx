import React from 'react';
import { Text } from '@chakra-ui/react';

interface LabelProps {}

export const Label: React.FC<LabelProps> = ({ children }) => {
	return (
		<Text fontWeight="bolder" whiteSpace="nowrap">
			{children}
		</Text>
	);
};
