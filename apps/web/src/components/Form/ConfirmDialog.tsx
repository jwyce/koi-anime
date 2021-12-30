import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from '@chakra-ui/react';
import React from 'react';

interface ConfirmDialogProps {
	header: string;
	body: string;
	actionName: string;
	actionColor: string;
	actionCallback: () => void;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	header,
	body,
	actionName,
	actionColor,
	actionCallback,
	isOpen,
	setIsOpen,
}) => {
	const onClose = () => setIsOpen(false);
	let cancelRef;

	return (
		<AlertDialog
			isOpen={isOpen}
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			motionPreset="slideInBottom"
			isCentered
		>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize="lg" fontWeight="bold">
						{header}
					</AlertDialogHeader>

					<AlertDialogBody>{body}</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button colorScheme={actionColor} onClick={actionCallback} ml={3}>
							{actionName}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};
