import _ from 'lodash';
import React from 'react';

import { isServer } from '@/utils/isServer';
import { textColorFromListStatus } from '@/utils/textColorFromListStatus';
import { Box, Select, useColorMode } from '@chakra-ui/react';
import { ListStatus, Media, useUserListCountsQuery } from '@koi/controller';

import { Loader } from '../UI/Loader';
import { StatusButton } from './StatusButton';
import { shallowRouteInput } from './UserLibrary';

interface FilterPanelProps {
	username: string;
	media: Media | 'top5';
	status: ListStatus | null;
	filterCallback: (options: shallowRouteInput) => void;
}

interface StatusButton {
	status: ListStatus | null;
	text: string;
	count: number;
	color: string;
	icon: string;
	order: number;
}

interface MediaList {
	media: Media | 'top5';
	text: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
	username,
	media,
	status,
	filterCallback,
}) => {
	const { colorMode } = useColorMode();
	const { data, loading } = useUserListCountsQuery({
		variables: { username, media: media !== 'top5' ? media : Media.Anime },
		skip: isServer(),
	});

	const mediaList: MediaList[] = [
		{
			media: Media.Anime,
			text: `${username}'s Anime`,
		},
		{
			media: Media.Manga,
			text: `${username}'s Manga`,
		},
		{
			media: 'top5',
			text: `${username}'s Top 5 🏆`,
		},
	];
	let statusButtons: StatusButton[] = [];
	if (data && media !== 'top5') {
		statusButtons.push({
			status: null,
			count: _.sumBy(data.userListStatusCounts, (x) => x.count),
			color: 'purple.400',
			icon: '✨',
			text: media === Media.Anime ? 'All Anime' : 'All Manga',
			order: 0,
		});
		data.userListStatusCounts.forEach((x) => {
			const { color, icon, text, order } = textColorFromListStatus(
				x.status,
				media
			);
			statusButtons.push({
				status: x.status,
				count: x.count,
				order,
				color,
				icon,
				text,
			});
		});
	}

	return (
		<Box
			bg={colorMode === 'dark' ? 'gray.700' : 'white'}
			p={4}
			borderRadius={6}
		>
			<Select
				defaultValue={media}
				onChange={(e) =>
					filterCallback({ media: e.target.value as Media | 'top5' })
				}
			>
				{mediaList.map((x, idx) => (
					<option key={idx} value={x.media}>
						{x.text}
					</option>
				))}
			</Select>
			{loading ? (
				<Loader size="md" />
			) : (
				<Box pt={3}>
					{_.orderBy(statusButtons, ['order'], ['asc']).map((x) => (
						<StatusButton
							key={x.text}
							status={x.status}
							color={x.color}
							count={x.count}
							icon={x.icon}
							text={x.text}
							filterCallback={filterCallback}
							selected={x.status === status}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};
