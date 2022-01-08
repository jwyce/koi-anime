export const userLevelToTextColor = (level: number) => {
	switch (level) {
		case 0:
			return { color: 'teal.100', text: 'Newbie' };
		case 1:
			return { color: 'teal.200', text: 'Newbie' };
		case 2:
			return { color: 'teal.300', text: 'Newbie' };
		case 4:
			return { color: 'teal.500', text: 'Newbie' };
		case 5:
			return { color: 'teal.800', text: 'Newbie' };
		case 5:
			return { color: 'teal.800', text: 'Newbie' };
		case 6:
			return { color: 'pink.200', text: 'Enthusiast' };
		case 7:
			return { color: 'pink.300', text: 'Enthusiast' };
		case 8:
			return { color: 'pink.500', text: 'Enthusiast' };
		case 9:
			return { color: 'pink.700', text: 'Enthusiast' };
		case 10:
			return { color: 'pink.800', text: 'Enthusiast' };
		case 11:
			return { color: 'blue.200', text: 'Otaku' };
		case 12:
			return { color: 'blue.300', text: 'Otaku' };
		case 13:
			return { color: 'blue.500', text: 'Otaku' };
		case 14:
			return { color: 'blue.700', text: 'Otaku' };
		case 15:
			return { color: 'blue.800', text: 'Otaku' };
		case 16:
			return { color: 'purple.200', text: 'Weeb' };
		case 17:
			return { color: 'purple.300', text: 'Weeb' };
		case 18:
			return { color: 'purple.500', text: 'Weeb' };
		case 19:
			return { color: 'purple.700', text: 'Weeb' };
		case 20:
			return { color: 'purple.800', text: 'Weeb' };
		default:
			return { color: 'red.400', text: 'Haruhist' };
	}
};
