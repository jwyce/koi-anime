import { Box, Icon, IconButton } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Ionicons } from '@expo/vector-icons';
import { StackHeaderProps } from '@react-navigation/stack';

import { appBackgroundColor } from '../../utils/appBackgroundColor';

interface HeaderProps extends StackHeaderProps {
	variant?: 'deafult' | '';
}

export const Header: React.FC<HeaderProps> = ({
	back,
	navigation,
	variant = 'deafult',
}) => {
	return (
		<Box safeAreaTop px="1" py="3" backgroundColor={appBackgroundColor()}>
			{back && (
				<TouchableOpacity onPress={navigation.goBack}>
					<IconButton
						icon={
							<Icon
								size="md"
								as={<Ionicons name="arrow-back" />}
								color="white"
							/>
						}
					/>
				</TouchableOpacity>
			)}
		</Box>
	);
};
