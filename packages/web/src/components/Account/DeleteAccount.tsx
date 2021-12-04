import { Button, Heading, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

export const DeleteAccount: React.FC<{}> = ({}) => {
	return (
		<>
			<Heading as="h2" fontSize="3xl">
				Danger Zone
			</Heading>
			<Spacer mt={5} />
			<Text fontSize="xs" color="red.400">
				Danger Zone! Deleting your account is irreversible.
			</Text>
			<Button size="lg" width="100%" colorScheme="red" mt={3} mb={10}>
				Delete Account
			</Button>
		</>
	);
};
