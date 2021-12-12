import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
interface DotProps {
	idx: number;
	scrollX: Animated.SharedValue<number>;
}

export const Dot: React.FC<DotProps> = ({ idx, scrollX }) => {
	const dStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			scrollX.value / width,
			[idx - 1, idx, idx + 1],
			[0.5, 1, 0.5],
			Extrapolate.CLAMP
		);

		const scale = interpolate(
			scrollX.value / width,
			[idx - 1, idx, idx + 1],
			[1, 1.25, 1],
			Extrapolate.CLAMP
		);

		return {
			opacity,
			transform: [{ scale }],
		};
	});

	return (
		<Animated.View
			style={[
				{
					backgroundColor: '#fa7268',
					width: 8,
					height: 8,
					borderRadius: 4,
					margin: 4,
				},
				dStyle,
			]}
		></Animated.View>
	);
};
