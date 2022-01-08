import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import { Button, Heading, Text } from '@chakra-ui/react';
import { ApprovalText } from '../Media/ApprovalText';
import { Rank } from '@koi/controller';

interface MediaDescriptionProps {
	title: string;
	date?: Date | string;
	description: string;
	rank?: Rank | null;
}

type ReadMoreType = 'read-more' | 'read-less' | 'hidden';

export const MediaDescription: React.FC<MediaDescriptionProps> = ({
	title,
	date,
	description,
	rank,
}) => {
	const MAX_CHARS = 480;
	const splitDesc = description?.split('\n');

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
			<Heading fontSize="3xl">
				{title}{' '}
				{date && (
					<Text as="span" fontSize="lg" color="gray.500" fontWeight="bold">
						{dayjs(date).format('YYYY')}
					</Text>
				)}
			</Heading>
			{rank && <ApprovalText textApproval={rank.approval} />}
			{state === 'hidden' && (
				<>
					{description?.split('\n').map((x, i) => (
						<React.Fragment key={i}>
							{x === '' ? <br /> : <Text>{x}</Text>}
						</React.Fragment>
					))}
				</>
			)}
			{state === 'read-less' && (
				<>
					{description?.split('\n').map((x, i) => (
						<React.Fragment key={i}>
							{x === '' ? <br /> : <Text>{x}</Text>}
						</React.Fragment>
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
						<React.Fragment key={i}>
							{x === '' ? <br /> : <Text>{x}</Text>}
						</React.Fragment>
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
