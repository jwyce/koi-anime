import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { Button, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react';

interface MediaDescriptionProps {
	title: string;
	date: Date | string;
	description: string;
}

type ReadMoreType = 'read-more' | 'read-less' | 'hidden';

export const MediaDescription: React.FC<MediaDescriptionProps> = ({
	title,
	date,
	description,
}) => {
	const MAX_CHARS = 480;
	const splitDesc = description.split('\n');

	const [clippedDesc, setClippedDesc] = useState<string[]>([]);
	const [state, setState] = useState<ReadMoreType>('hidden');

	useEffect(() => {
		let charCount = 0;
		for (let i = 0; i < splitDesc.length; i++) {
			const p = splitDesc[i];
			charCount += p.length;

			if (charCount >= MAX_CHARS) {
				const trimmedText =
					p.substring(0, _.clamp(p.length - charCount + MAX_CHARS, p.length)) +
					'...';
				setClippedDesc([...splitDesc.slice(0, i), trimmedText]);
				setState('read-more');
				break;
			}
		}
	}, []);

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
			{state === 'hidden' && (
				<>
					{description.split('\n').map((x, i) => (
						<>{x === '' ? <br /> : <Text key={i}>{x}</Text>}</>
					))}
				</>
			)}
			{state === 'read-less' && (
				<>
					{description.split('\n').map((x, i) => (
						<>{x === '' ? <br /> : <Text key={i}>{x}</Text>}</>
					))}
					<Button
						colorScheme="teal"
						variant="link"
						mt={3}
						style={{ textDecoration: 'none' }}
						onClick={() => setState('read-more')}
					>
						read less
					</Button>
				</>
			)}
			{state === 'read-more' && (
				<>
					{clippedDesc.map((x, i) => (
						<>{x === '' ? <br /> : <Text key={i}>{x}</Text>}</>
					))}
					<Button
						colorScheme="teal"
						variant="link"
						mt={3}
						style={{ textDecoration: 'none' }}
						onClick={() => setState('read-less')}
					>
						read more
					</Button>
				</>
			)}
		</>
	);
};
