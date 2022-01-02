import React from 'react';
import { Text } from '@chakra-ui/react';

interface ApprovalTextProps {
	textApproval: string;
	truncated?: boolean;
	size?: 'sm' | 'md';
}

export const ApprovalText: React.FC<ApprovalTextProps> = ({
	textApproval,
	truncated = false,
	size = 'md',
}) => {
	const approval = parseFloat(textApproval.slice(0, -1));
	if (approval >= 80.0) {
		return (
			<Text fontSize={size} fontWeight={600} color="green.300">
				{textApproval}
				{!truncated && ' Community Approval'}
			</Text>
		);
	} else if (approval >= 50.0) {
		return (
			<Text fontSize={size} fontWeight={600} color="yellow.500">
				{textApproval}
				{!truncated && ' Community Approval'}
			</Text>
		);
	} else {
		return (
			<Text fontSize={size} fontWeight={600} color="red.400">
				{textApproval}
				{!truncated && ' Community Approval'}
			</Text>
		);
	}
};
