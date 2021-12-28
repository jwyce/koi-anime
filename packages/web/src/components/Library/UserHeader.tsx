import React from 'react';

import { profileColor, profileIcon } from '@/utils/profilePreferences';
import { Avatar, Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { PublicUserFragment } from '@koi/controller';

interface UserHeaderProps {
	user: PublicUserFragment;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
	return (
		<Box>
			<HStack spacing={10}>
				<Avatar
					icon={profileIcon(user.profileIcon, '3.5rem')!}
					size="xl"
					bg={profileColor(user.profileColor)!}
					color="white"
				/>
				<Stack spacing={0}>
					<Heading>{user.username}</Heading>
					<Text fontSize="lg" color="teal.200" fontWeight={500}>
						Level 1: Newbie
					</Text>
				</Stack>
			</HStack>
		</Box>
	);
};
