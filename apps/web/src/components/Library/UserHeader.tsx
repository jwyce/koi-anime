import React from 'react';

import { profileColor, profileIcon } from '@/utils/profilePreferences';
import { Avatar, Box, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { PublicUserFragment, useUserLevelQuery } from '@koi/controller';

import { Loader } from '../UI/Loader';
import { userLevelToTextColor } from '@/utils/userLevelToTextColor';

interface UserHeaderProps {
	user: PublicUserFragment;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ user }) => {
	const { data, loading } = useUserLevelQuery({
		variables: { username: user.username },
	});
	if (loading || !data) {
		return <Loader size="xl" />;
	}

	const { color, text } = userLevelToTextColor(data.userLevel);
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
					<Text fontSize="lg" color={color} fontWeight={500}>
						Level {data.userLevel}: {text}
					</Text>
				</Stack>
			</HStack>
		</Box>
	);
};
