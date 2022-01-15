export const userLevelToTextColor = (level: number) => {
	switch (level) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			return { color: 'teal.200', text: 'Newbie' };
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
			return { color: 'pink.600', text: 'Enthusiast' };
		case 11:
		case 12:
		case 13:
		case 14:
		case 15:
			return { color: 'blue.600', text: 'Veteran' };
		case 16:
		case 17:
		case 18:
		case 19:
		case 20:
			return { color: 'purple.300', text: 'Otaku' };
		default:
			return { color: 'red.400', text: 'Weeb' };
	}
};
