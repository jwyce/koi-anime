import { ListStatus, Media } from '@koi/controller';

export const textColorFromListStatus = (status: ListStatus, media: Media) => {
	switch (status) {
		case ListStatus.Completed:
			return { text: 'Completed', color: 'green.600', icon: '✅', order: 3 };
		case ListStatus.Current:
			return {
				text:
					media === Media.Anime ? 'Currently Watching' : 'Currently Reading',
				color: 'pink.700',
				icon: '🔥',
				order: 1,
			};
		case ListStatus.Planned:
			return {
				text: media === Media.Anime ? 'Want to Watch' : 'Want to Read',
				color: 'blue.600',
				icon: '💖',
				order: 2,
			};
		case ListStatus.OnHold:
			return {
				text: 'On Hold',
				color: 'yellow.600',
				icon: '⏳',
				order: 4,
			};
		case ListStatus.Dropped:
			return {
				text: 'Dropped',
				color: 'red.600',
				icon: '💩',
				order: 5,
			};
	}
};
