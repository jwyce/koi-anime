import { Box, Select } from '@chakra-ui/react';
import { ListStatus, Media } from '@koi/controller';
import React from 'react';

interface FilterPanelProps {
	username: string;
	media: Media | 'top5';
	status: ListStatus;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
	username,
	media,
	status,
}) => {
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
	return (
		<Box bg="gray.700" p={4} borderRadius={6}>
			<Select>
				{mediaList.map((x, idx) => (
					<option key={idx} value={x.media}>
						{x.text}
					</option>
				))}
			</Select>
		</Box>
	);
};
