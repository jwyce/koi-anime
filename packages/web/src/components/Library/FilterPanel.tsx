import { isServer } from '@/utils/isServer';
import { textColorFromListStatus } from '@/utils/textColorFromListStatus';
import { Box, Select } from '@chakra-ui/react';
import { ListStatus, Media, useUserListCountsQuery } from '@koi/controller';
import React from 'react';
import { Loader } from '../UI/Loader';
import _ from 'lodash';
import { StatusButton } from './StatusButton';

interface FilterPanelProps {
	username: string;
	media: Media | 'top5';
	status: ListStatus | null;
}

interface StatusButton {
	status: ListStatus | null;
	text: string;
	count: number;
	color: string;
	icon: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
	username,
	media,
	status,
}) => {
	const { data, loading } = useUserListCountsQuery({
		variables: { username },
		skip: isServer(),
	});

	const mediaList = [
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
		});
		data.userListStatusCounts.forEach((x) => {
			const { color, icon, text } = textColorFromListStatus(x.status, media);
			statusButtons.push({
				status: x.status,
				count: x.count,
				color,
				icon,
				text,
			});
		});
	}

	console.log('test', statusButtons);

	return (
		<Box bg="gray.700" p={4} borderRadius={6}>
			<Select>
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
					{statusButtons.map((x) => (
						<StatusButton
							color={x.color}
							count={x.count}
							icon={x.icon}
							text={x.text}
							selected={x.status === status}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};
