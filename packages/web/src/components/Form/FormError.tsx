import React from 'react';
import { FieldError } from 'react-hook-form';
import { Text } from '@chakra-ui/react';

interface FormErrorProps {
	field?: FieldError;
}

export const FormError: React.FC<FormErrorProps> = ({ field }) => {
	if (field) {
		return <Text color="red.500">{field.message}</Text>;
	}
	return <></>;
};
