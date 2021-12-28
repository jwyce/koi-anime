import { useLibraryQueryParams } from '@/utils/hooks/useLibraryQueryParams';
import { Box } from '@chakra-ui/react';
import {
	Direction,
	ListStatus,
	Media,
	PublicUserFragment,
	SortBy,
} from '@koi/controller';
import React, { useCallback } from 'react';
import { AnimeList } from './AnimeList';
import { FilterPanel } from './FilterPanel';
import { MangaList } from './MangaList';

interface UserLibraryProps {
	user: PublicUserFragment;
}

export interface shallowRouteInput {
	title?: string;
	sort?: SortBy;
	media?: Media | 'top5';
	direction?: Direction;
	status?: ListStatus | null;
}

export const UserLibrary: React.FC<UserLibraryProps> = ({ user }) => {
	const { title, sort, media, status, direction, router } =
		useLibraryQueryParams();
	const currentParams = { ...router.query };
	delete currentParams.username;
	console.log(currentParams);

	const filterCallback = useCallback(
		({ title, sort, media, direction, status }: shallowRouteInput) => {
			console.log(media, title, sort, direction, status);
			if (status === null) {
				delete currentParams.status;
			}
			router.push(
				{
					pathname: `/users/wabamn/library`,
					query: {
						...currentParams,
						...(title && { title: title.toLowerCase() }),
						...(sort && { sort: sort.toLowerCase() }),
						...(media && { media: media.toLowerCase() }),
						...(status && { status: status?.toLowerCase() }),
						...(direction && { direction: direction.toLowerCase() }),
					},
				}
				// undefined,
				// { shallow: true }
			);
		},
		[]
	);

	return (
		<>
			<Box flex={3.5} h="100%">
				<>
					{media === Media.Anime && (
						<AnimeList
							username={user.username}
							title={title ?? ''}
							sort={sort}
							status={status}
							direction={direction}
							filterCallback={filterCallback}
						/>
					)}
				</>
				<>{media === Media.Manga && <MangaList username={user.username} />}</>
			</Box>
			<Box flex={1.2} h="100%" pos="sticky" top="24" mx={3}>
				<FilterPanel
					username={user.username}
					media={media}
					status={status}
					filterCallback={filterCallback}
				/>
			</Box>
		</>
	);
};
