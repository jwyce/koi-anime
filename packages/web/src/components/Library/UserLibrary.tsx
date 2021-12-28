import { Box } from '@chakra-ui/react';
import { ListStatus, Media, PublicUserFragment } from '@koi/controller';
import { useRouter } from 'next/router';
import React from 'react';
import { AnimeList } from './AnimeList';
import { FilterPanel } from './FilterPanel';

interface UserLibraryProps {
	user: PublicUserFragment;
}

const mediaQueryToEnum = (media: string) => {
	if (!media || media.toLowerCase() === 'anime') {
		return Media.Anime;
	} else if (media.toLowerCase() === 'manga') {
		return Media.Manga;
	}
	return Media.Anime;
};

export const UserLibrary: React.FC<UserLibraryProps> = ({ user }) => {
	const router = useRouter();
	const { title, sort, media, status, direction } = router.query;

	return (
		<>
			<Box flex={3.5} h="100%">
				{(media === undefined || media === 'anime') && (
					<AnimeList username={user.username} />
				)}
			</Box>
			<Box flex={1.2} h="100%" pos="sticky" top="24" mx={3}>
				{/* <Button
					colorScheme="teal"
					onClick={() => {
						router.push(
							{
								pathname: `/users/${user.username}/library`,
								query: { title: 'this is a test' },
							},
							undefined,
							{ shallow: true }
						);
					}}
				>
					Test Shallow Route
				</Button> */}
				<FilterPanel
					username={user.username}
					media={mediaQueryToEnum(media as string)}
					status={ListStatus.Planned}
				/>
			</Box>
		</>
	);
};
