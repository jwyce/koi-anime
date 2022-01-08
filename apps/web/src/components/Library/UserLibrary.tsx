import { useLibraryQueryParams } from '@/utils/hooks/useLibraryQueryParams';
import { Box } from '@chakra-ui/react';
import {
	Direction,
	ListStatus,
	Media,
	PublicUserFragment,
	ResourceType,
	SortBy,
} from '@koi/controller';
import React, { useCallback } from 'react';
import { AnimeList } from './AnimeList';
import { FilterPanel } from './FilterPanel';
import { MangaList } from './MangaList';
import { MyTop5 } from './MyTop5';
import { SearchBar } from './SearchBar';

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

	const filterCallback = useCallback(
		({ title, sort, media, direction, status }: shallowRouteInput) => {
			if (status === null) {
				delete currentParams.status;
			}
			if (title === '') {
				delete currentParams.title;
			}
			const query = {
				...currentParams,
				...(title && { title: title.toLowerCase() }),
				...(sort && { sort: sort.toLowerCase() }),
				...(media && { media: media.toLowerCase() }),
				...(status && { status: status?.toLowerCase() }),
				...(direction && { direction: direction.toLowerCase() }),
			};
			router.push({
				pathname: `/users/wabamn/library`,
				query,
			});
		},
		[currentParams]
	);

	return (
		<>
			<Box flex={3.5} h="100%">
				<>
					{media === Media.Anime && (
						<>
							<SearchBar
								username={user.username}
								title={title ?? ''}
								sort={sort}
								direction={direction}
								filterCallback={filterCallback}
							/>
							<AnimeList
								username={user.username}
								title={title ?? ''}
								sort={sort}
								status={status}
								direction={direction}
							/>
						</>
					)}
				</>
				<>
					{media === Media.Manga && (
						<>
							<SearchBar
								username={user.username}
								title={title ?? ''}
								sort={sort}
								direction={direction}
								filterCallback={filterCallback}
							/>
							<MangaList
								username={user.username}
								title={title ?? ''}
								sort={sort}
								status={status}
								direction={direction}
							/>
						</>
					)}
				</>
				<>
					{media === 'top5' && (
						<>
							<MyTop5 type={ResourceType.Anime} title="Top 5 Anime" />
							<MyTop5 type={ResourceType.Manga} title="Top 5 Manga" />
							<MyTop5 type={ResourceType.OpSong} title="Top 5 Openings" />
							<MyTop5 type={ResourceType.EdSong} title="Top 5 Endings" />
							<MyTop5 type={ResourceType.FCharacter} title="Top 5 Girls" />
							<MyTop5 type={ResourceType.MCharacter} title="Top 5 Boys" />
						</>
					)}
				</>
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
