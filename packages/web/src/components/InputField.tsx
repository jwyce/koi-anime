import React, { JSXElementConstructor, ReactElement } from 'react';
import { ControllerRenderProps, FieldError } from 'react-hook-form';

import {
	FormControl,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
} from '@chakra-ui/react';

interface InputFieldProps {
	field: ControllerRenderProps<any>;
	type?: string;
	endAdornment?: ReactElement<any, string | JSXElementConstructor<any>>;
	actionCallback?: () => void;
	size?: 'md' | 'sm';
	label?: string;
	errorField?: FieldError;
}

export const InputField: React.FC<InputFieldProps> = ({
	field,
	type,
	endAdornment,
	size,
	errorField,
	label,
	actionCallback,
}) => {
	return (
		<>
			{endAdornment ? (
				<FormControl>
					<FormLabel htmlFor={field.name} mb="0">
						{label}
					</FormLabel>
					<InputGroup size={size}>
						<Input
							{...field}
							placeholder={label}
							label={field.name}
							isInvalid={errorField !== undefined}
							pr="4.5rem"
							type={type}
						/>
						<InputRightElement width="3rem">
							{
								<IconButton
									aria-label={`${field.name} action`}
									h="3rem"
									size="lg"
									variant="ghost"
									isRound
									onClick={actionCallback}
									icon={endAdornment}
								/>
							}
						</InputRightElement>
					</InputGroup>
				</FormControl>
			) : (
				<FormControl>
					<FormLabel htmlFor={field.name} mb="0">
						{label}
					</FormLabel>
					<Input
						{...field}
						placeholder={label}
						label={field.name}
						isInvalid={errorField !== undefined}
						size={size}
						type={type}
					/>
				</FormControl>
			)}
		</>
	);
};
