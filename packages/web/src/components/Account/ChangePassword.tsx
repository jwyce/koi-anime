import React from 'react';

import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { SimpleGrid, Stack } from '@chakra-ui/layout';
import { Heading, Spacer } from '@chakra-ui/react';
import { DefaultUserFragment } from '@koi/controller';

interface ChangePasswordProps {
	me: DefaultUserFragment;
	sendConfirmationCallback: () => void;
}

export const ChangePassword: React.FC<ChangePasswordProps> = ({
	me,
	sendConfirmationCallback,
}) => {
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
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
							New Password
						</FormLabel>
						<Input type="password" />
					</SimpleGrid>
				</FormControl>
				<FormControl>
					<SimpleGrid columns={2} spacing={10}>
						<FormLabel htmlFor="email-alerts" mb="0" whiteSpace="nowrap">
							Confirm Password
						</FormLabel>
						<Input type="password" />
					</SimpleGrid>
				</FormControl>
			</Stack>
			<Button size="lg" width="100%" colorScheme="teal" mt={5}>
				Change Password
			</Button>
		</>
	);
};