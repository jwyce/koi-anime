import { Box, Heading, Image, Text, VStack } from 'native-base';
import React from 'react';
import { Dimensions, ImageSourcePropType } from 'react-native';

const { width } = Dimensions.get('window');
interface SlideProps {
	title: string;
	description: string;
	image: ImageSourcePropType;
}

export const Slide: React.FC<SlideProps> = ({ title, description, image }) => {
	return (
		<Box w={width}>
			<VStack alignItems="center" space={3}>
				<Image source={image} w={80} h={80} alt="onboard img" />
				<VStack alignItems="center" space={1} px={3}>
					<Heading size="xl" color="white">
						{title}
					</Heading>
					<Text fontSize="lg" textAlign="center">
						{description}
					</Text>
				</VStack>
			</VStack>
		</Box>
	);
};
