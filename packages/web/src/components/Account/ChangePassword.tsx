import React from 'react';

import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { SimpleGrid, Stack } from '@chakra-ui/layout';
import { Heading, Spacer, useToast } from '@chakra-ui/react';
import {
	DefaultUserFragment,
	resetPasswordSchema,
	useChangePasswordMutation,
} from '@koi/controller';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormError } from '../Form/FormError';

interface ChangePasswordProps {
	me: DefaultUserFragment;
	sendConfirmationCallback: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
	me,
	sendConfirmationCallback,
}) => {
	const toast = useToast();
	const [changePasswored] = useChangePasswordMutation();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
		resolver: yupResolver(resetPasswordSchema as any),
	});

	const onSubmit = async (data: any) => {
		const response = await changePasswored({
			variables: data,
		});

		if (response.data?.changePassword.errors) {
			toast({
				title: response.data?.changePassword.errors[0].field,
				position: 'bottom-right',
				variant: 'left-accent',
				description: response.data?.changePassword.errors[0].message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'Password Reset',
				position: 'bottom-right',
				variant: 'left-accent',
				description: 'Password reset, please login with your new password',
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Heading as="h2" fontSize="3xl">
				Account Settings
			</Heading>

			<Spacer mt={5} />

			<Stack spacing="5">
				{me.isConfirmed ? (
					<Alert status="success" variant="left-accent">
						<AlertIcon />
						Your email is verified 🎉
					</Alert>
				) : (
					<Alert status="warning" variant="left-accent">
						<AlertIcon />
						Seems your email is not confirmed
						<Button ml={5} onClick={sendConfirmationCallback}>
							Resend Confirmation
						</Button>
					</Alert>
				)}

				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={['column']} spacing=".8em">
						<Controller
							name="newPassword"
							control={control}
							render={({ field }) => (
								<FormControl>
									<SimpleGrid columns={2} spacing={10}>
										<FormLabel htmlFor="newPassword" mb="0" whiteSpace="nowrap">
											New Password
										</FormLabel>
										<Input {...field} type="password" />
									</SimpleGrid>
								</FormControl>
							)}
						/>
						<FormError field={errors.newPassword} />
						<Controller
							name="confirmPassword"
							control={control}
							render={({ field }) => (
								<FormControl>
									<SimpleGrid columns={2} spacing={10}>
										<FormLabel
											htmlFor="confirmPassword"
											mb="0"
											whiteSpace="nowrap"
										>
											Confirm Password
										</FormLabel>
										<Input {...field} type="password" />
									</SimpleGrid>
								</FormControl>
							)}
						/>
						<FormError field={errors.confirmPassword} />
						<Button type="submit" colorScheme="teal" size="lg">
							Change Password
						</Button>
					</Stack>
				</form>
			</Stack>
		</>
	);
};
