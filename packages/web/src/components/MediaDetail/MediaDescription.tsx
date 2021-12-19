import dayjs from 'dayjs';
import React from 'react';

import { Heading, Text, Wrap, WrapItem } from '@chakra-ui/react';

interface MediaDescriptionProps {
	title: string;
	date: Date | string;
	description: string;
}

export const MediaDescription: React.FC<MediaDescriptionProps> = ({
	title,
	date,
	description,
}) => {
	return (
		<>
			<Wrap align="flex-end">
				<WrapItem>
					<Heading fontSize="3xl">{title}</Heading>
				</WrapItem>
				<WrapItem>
					<Text fontSize="lg" color="gray.500" fontWeight="bold">
						{dayjs(date).format('YYYY')}
					</Text>
				</WrapItem>
			</Wrap>
			{description.split('\n').map((x, i) => (
				<>{x === '' ? <br /> : <Text key={i}>{x}</Text>}</>
			))}
		</>
	);
};
