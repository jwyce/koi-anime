import {
	FormControl,
	Stack,
	Input,
	Icon,
	Text,
	WarningOutlineIcon,
	HStack,
} from 'native-base';
import React from 'react';
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';

interface InputFieldProps {
	field: ControllerRenderProps<any, any>;
	type?: string;
	startAdornment?: JSX.Element | JSX.Element[] | undefined;
	endAdornment?: JSX.Element | JSX.Element[] | undefined;
	actionCallback?: () => void;
	size?: 'md' | 'lg';
	label?: string;
	error?: FieldError;
	required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
	field,
	type,
	startAdornment,
	endAdornment,
	actionCallback,
	size = 'lg',
	label,
	error,
	required,
}) => {
	return (
		<FormControl isRequired={required}>
			<Stack>
				{label && <FormControl.Label>{label}</FormControl.Label>}
				<Input
					autoCapitalize="none"
					placeholder={label}
					onBlur={field.onBlur}
					onChangeText={field.onChange}
					value={field.value}
					size={size === 'lg' ? '2xl' : 'lg'}
					type={type}
					isInvalid={error !== undefined}
					p={3}
					InputLeftElement={
						startAdornment ? (
							<Icon as={startAdornment} size={5} ml="2" color="muted.400" />
						) : undefined
					}
					InputRightElement={
						endAdornment ? (
							<TouchableOpacity onPress={actionCallback}>
								<Icon as={endAdornment} size={6} mr="2" color="muted.400" />
							</TouchableOpacity>
						) : undefined
					}
				/>
				{error && (
					<HStack alignItems="center" space={2}>
						<WarningOutlineIcon size="xs" color="error.500" />
						<Text fontSize="xs" color="error.500" fontWeight={500}>
							{error.message}
						</Text>
					</HStack>
				)}
			</Stack>
		</FormControl>
	);
};
