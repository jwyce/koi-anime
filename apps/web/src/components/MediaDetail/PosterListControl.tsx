import { isServer } from '@/utils/isServer';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Stack,
	Box,
	Image,
	Menu,
	Button,
	HStack,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import {
	ListStatus,
	Media,
	MyListEntryStatusDocument,
	MyListEntryStatusQuery,
	Rank,
	useAddUpdateMyListEntryMutation,
	useDeleteListEntryMutation,
	useMyListEntryStatusQuery,
} from '@koi/controller';
import React from 'react';
import { HeartIcon } from '../UI/HeartIcon';
import { Loader } from '../UI/Loader';

interface PosterListControlProps {
	rank?: Rank | null;
	posterSrc: string | undefined;
	type: 'anime' | 'manga' | 'character';
	slug: string;
}

export const PosterListControl: React.FC<PosterListControlProps> = ({
	rank,
	posterSrc,
	type,
	slug,
}) => {
	const mediaType = type === 'manga' ? Media.Manga : Media.Anime;

	const { data, loading } = useMyListEntryStatusQuery({
		variables: { slug, type: mediaType },
		skip: isServer(),
	});
	const [addUpdateListEntry] = useAddUpdateMyListEntryMutation();
	const [deleteListEntry] = useDeleteListEntryMutation();

	const onSelect = async (status: ListStatus | null) => {
		if (status) {
			await addUpdateListEntry({
				variables: {
					options: {
						slug,
						type: mediaType,
						status,
					},
				},
				update: (cache, payload) => {
					const queryVars = { slug, type: mediaType };
					const payloadStatus = payload.data?.addUpdateMyList.status;
					const newData = payloadStatus
						? { status: payloadStatus, resourceSlug: slug }
						: null;

					cache.writeQuery<MyListEntryStatusQuery>({
						query: MyListEntryStatusDocument,
						data: { myListEntryStatus: newData },
						variables: queryVars,
					});
				},
			});
		} else {
			await deleteListEntry({
				variables: {
					slug,
					type: mediaType,
				},
				update: (cache) => {
					const queryVars = { slug, type: mediaType };

					cache.writeQuery<MyListEntryStatusQuery>({
						query: MyListEntryStatusDocument,
						data: { myListEntryStatus: null },
						variables: queryVars,
					});
				},
			});
		}
	};

	const statusList = [
		{
			icon: '🔥',
			status: ListStatus.Current,
			text: type === 'anime' ? 'Started Watching' : 'Started Reading',
		},
		{
			icon: '💖',
			status: ListStatus.Planned,
			text: type === 'anime' ? 'Want to Watch' : 'Want to Read',
		},
		{ icon: '✅', status: ListStatus.Completed, text: 'Completed' },
		{ icon: '⏳', status: ListStatus.OnHold, text: 'On Hold' },
		{ icon: '💩', status: ListStatus.Dropped, text: 'Dropped' },
		{ icon: '🗑️', status: null, text: 'Remove from Library' },
	];
	let statusFilter = statusList;
	if (!data?.myListEntryStatus?.status) {
		statusFilter = statusFilter.filter((x) => x.status !== null);
	}

	return (
		<Stack>
			<Image src={posterSrc} alt="poster" borderRadius={6} />
			{rank && rank.rank < 1000 && (
				<Box pos="absolute" top={-1} right={1}>
					<HeartIcon rank={rank.rank} size={36} />
				</Box>
			)}
			<>
				{type !== 'character' && (
					<>
						{!data || loading ? (
							<Loader size="xl" />
						) : (
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<ChevronDownIcon />}
									w="100%"
								>
									{data?.myListEntryStatus ? (
										<HStack spacing="1">
											<Box>
												<Text fontWeight={100}>
													{
														statusList.find(
															(x) => x.status === data.myListEntryStatus?.status
														)?.icon
													}
												</Text>
											</Box>
											<Text textTransform="capitalize">
												{
													statusList.find(
														(x) => x.status === data.myListEntryStatus?.status
													)?.text
												}
											</Text>
										</HStack>
									) : (
										<HStack>
											<span>Add to Library</span>
										</HStack>
									)}
								</MenuButton>
								<MenuList overflowY="scroll" maxH="60">
									{statusFilter.map((x, idx) => (
										<MenuItem
											icon={<Text>{x.icon}</Text>}
											key={idx}
											onClick={() => onSelect(x.status)}
										>
											{x.text}
										</MenuItem>
									))}
								</MenuList>
							</Menu>
						)}
					</>
				)}
			</>
		</Stack>
	);
};
