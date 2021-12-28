import { Media, SortBy, ListStatus, Direction } from '@koi/controller';
import { useRouter } from 'next/router';

const mediaQueryToEnum = (media: string): Media | 'top5' => {
	if (!media || media.toLowerCase() === 'anime') {
		return Media.Anime;
	} else if (media.toLowerCase() === 'manga') {
		return Media.Manga;
	} else if (media.toLowerCase() === 'top5') {
		return 'top5';
	}
	return Media.Anime;
};

export const useLibraryQueryParams = () => {
	const router = useRouter();
	const title =
		typeof router.query.title === 'string' ? router.query.title : undefined;
	const media =
		typeof router.query.media === 'string'
			? mediaQueryToEnum(router.query.media)
			: Media.Anime;
	const sort =
		typeof router.query.sort === 'string'
			? (router.query.sort.toUpperCase() as SortBy)
			: SortBy.Added;
	const status =
		typeof router.query.status === 'string'
			? (router.query.status.toUpperCase() as ListStatus)
			: null;
	const direction =
		typeof router.query.direction === 'string'
			? (router.query.direction.toUpperCase() as Direction)
			: Direction.Asc;

	return { title, media, sort, status, direction, router };
};
