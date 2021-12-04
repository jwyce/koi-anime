import React, { useState } from 'react';

import { Button, Heading, Spacer, Text } from '@chakra-ui/react';
import { ConfirmDialog } from '../Form/ConfirmDialog';

export const DeleteAccount: React.FC<{}> = ({}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<Heading as="h2" fontSize="3xl">
				Danger Zone
			</Heading>
			<Spacer mt={5} />
			<Text fontSize="xs" color="red.400">
				Danger Zone! Deleting your account is irreversible.
			</Text>
			<Button
				size="lg"
				width="100%"
				colorScheme="red"
				mt={3}
				mb={10}
				onClick={() => setIsOpen(true)}
			>
				Delete Account
			</Button>

			<ConfirmDialog
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				header="Delete Account"
				body="Are you sure? You can't undo this action afterwards."
				actionName="Delete"
				actionColor="red"
				actionCallback={() => alert('deleted')}
			/>
		</>
	);
};
