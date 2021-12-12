import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from 'react-native-reanimated';
import { Slide } from './Slide';
import { Dot } from './Dot';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	slider: {
		height: 0.51 * height,
	},
	pagination: {
		top: 440,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
	},
});

const slides = [
	{
		title: 'Browse Content',
		description: 'Find your favorite anime and manga',
		image: require('../../../assets/images/remram.png'),
	},
	{
		title: 'Track Progress',
		description: 'Keep track of your episode / chapter progress',
		image: require('../../../assets/images/remram.png'),
	},
	{
		title: "Find out what's Best",
		description:
			'Vote for your favorite anime, manga, character, or song in random matchups',
		image: require('../../../assets/images/remram.png'),
	},
];

export const Onboarding: React.FC<{}> = ({}) => {
	const scrollX = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (e) => {
			scrollX.value = e.contentOffset.x;
		},
	});

	return (
		<Animated.View style={[styles.slider]}>
			<Animated.ScrollView
				horizontal
				snapToInterval={width}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={1}
				onScroll={scrollHandler}
			>
				<Animated.View
					style={[
						{
							flex: 1,
							flexDirection: 'row',
							width: width * slides.length,
						},
					]}
				>
					{slides.map(({ title, description, image }, idx) => (
						<Slide
							title={title}
							description={description}
							image={image}
							key={idx}
						/>
					))}
				</Animated.View>
			</Animated.ScrollView>
			<View style={[StyleSheet.absoluteFillObject, styles.pagination]}>
				{slides.map((_, idx) => (
					<Dot key={idx} {...{ idx, scrollX }} />
				))}
			</View>
		</Animated.View>
	);
};
