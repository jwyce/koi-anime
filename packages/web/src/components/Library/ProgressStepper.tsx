import { ApolloCache, gql } from '@apollo/client';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
	Box,
	Button,
	HStack,
	IconButton,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Progress,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import {
	AddUpdateMyListEntryMutation,
	Media,
	useAddUpdateMyListEntryMutation,
	useMeQuery,
} from '@koi/controller';
import React, { useState } from 'react';
import { Loader } from '../UI/Loader';

interface ProgressStepperProps {
	count: number;
	total: number;
	type: Media;
	slug: string;
	listId: number;
	username: string;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
	count,
	total,
	type,
	slug,
	listId,
	username,
}) => {
	const { data, loading } = useMeQuery();
	const [updateListEntry] = useAddUpdateMyListEntryMutation();
	const { onOpen, onClose, isOpen } = useDisclosure();
	const [pickerVal, setPickerVal] = useState(count);

	const updateCache = (
		value: number,
		listId: number,
		cache: ApolloCache<AddUpdateMyListEntryMutation>
	) => {
		if (type === Media.Anime) {
			const data = cache.readFragment<{
				id: number;
				currentEpisode: number;
			}>({
				id: 'List:' + listId,
				fragment: gql`
					fragment _ on List {
						id
						currentEpisode
					}
				`,
			});

			if (data) {
				cache.writeFragment({
					id: 'List:' + listId,
					fragment: gql`
						fragment __ on List {
							currentEpisode
						}
					`,
					data: { currentEpisode: value },
				});
			}
		} else {
			const data = cache.readFragment<{
				id: number;
				currentChapter: number;
			}>({
				id: 'List:' + listId,
				fragment: gql`
					fragment _ on List {
						id
						currentChapter
					}
				`,
			});

			if (data) {
				cache.writeFragment({
					id: 'List:' + listId,
					fragment: gql`
						fragment __ on List {
							currentChapter
						}
					`,
					data: { currentChapter: value },
				});
			}
		}
	};

	if (loading || !data) {
		return <Loader size="xl" />;
	}

	return (
		<Box>
			<Progress size="xs" colorScheme="teal" value={(count / total) * 100} />
			{data.me?.username === username ? (
				<HStack py={1} align="center" justify="space-between" px={2}>
					<IconButton
						size="xs"
						aria-label="sub"
						icon={<MinusIcon />}
						onClick={async () => {
							await updateListEntry({
								variables: {
									options: {
										type,
										slug,
										...(type === Media.Anime
											? { episodeCount: count - 1 }
											: { chapterCount: count - 1 }),
									},
								},
								update: (cache) => updateCache(count - 1, listId, cache),
							});
						}}
					/>
					<Popover
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						placement="top"
						closeOnBlur={false}
					>
						<PopoverTrigger>
							<Button size="xs">
								{count === 0 ? (
									<Text fontSize="smaller">Not Started</Text>
								) : (
									<Text fontSize="smaller">
										{type === Media.Anime ? 'Ep.' : 'Ch.'} {count}
									</Text>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent p={5} w="64">
							<PopoverArrow />
							<PopoverCloseButton
								onClick={() => {
									setPickerVal(count);
									onClose();
								}}
							/>
							<Stack spacing={5}>
								<HStack spacing={3}>
									<NumberInput
										value={pickerVal}
										onChange={(_, n) => setPickerVal(n)}
										min={0}
										max={total}
										w="20"
										size="sm"
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
									<Text fontSize="smaller">
										{' '}
										of {total} {type === Media.Anime ? 'Episodes' : 'Chapters'}
									</Text>
								</HStack>
								<Button size="sm" colorScheme="teal" onClick={async () => {
							await updateListEntry({
								variables: {
									options: {
										type,
										slug,
										...(type === Media.Anime
											? { episodeCount: pickerVal }
											: { chapterCount: pickerVal }),
									},
								},
								update: (cache) => updateCache(pickerVal, listId, cache),
							});

                }}>
									Save
								</Button>
							</Stack>
						</PopoverContent>
					</Popover>
					<IconButton
						size="xs"
						aria-label="add"
						icon={<AddIcon />}
						onClick={async () => {
							await updateListEntry({
								variables: {
									options: {
										type,
										slug,
										...(type === Media.Anime
											? { episodeCount: count + 1 }
											: { chapterCount: count + 1 }),
									},
								},
								update: (cache) => updateCache(count + 1, listId, cache),
							});
						}}
					/>
				</HStack>
			) : (
				<HStack py={1} align="center" justify="space-between" px={2}>
					{count === 0 ? (
						<Text fontSize="smaller">Not Started</Text>
					) : (
						<Text fontSize="smaller">
							{type === Media.Anime ? 'Ep.' : 'Ch.'} {count}
						</Text>
					)}
				</HStack>
			)}
		</Box>
	);
};
