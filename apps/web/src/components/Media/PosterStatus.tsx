import React from 'react';

import { Badge } from '@chakra-ui/react';
import { ListStatus, Status } from '@koi/controller';

interface PosterStatusProps {
	status: Status;
}

export const PosterStatus: React.FC<PosterStatusProps> = ({ status }) => {
	switch (status) {
		case Status.Current:
			return <Badge colorScheme="purple">Current</Badge>;
		case Status.Finished:
			return <Badge colorScheme="green">Finished</Badge>;
		case Status.Upcoming:
			return <Badge colorScheme="orange">Upcoming</Badge>;
		case Status.Unreleased:
			return <Badge colorScheme="red">Unreleased</Badge>;
		case Status.Tba:
			return <Badge>TBA</Badge>;
	}
};

interface PosterListStatusProps {
	status: ListStatus;
}

export const PosterListStatus: React.FC<PosterListStatusProps> = ({
	status,
}) => {
	switch (status) {
		case ListStatus.Completed:
			return <Badge colorScheme="green">Completed</Badge>;
		case ListStatus.Planned:
			return <Badge colorScheme="blue">Planned</Badge>;
		case ListStatus.Current:
			return <Badge colorScheme="purple">Current</Badge>;
		case ListStatus.OnHold:
			return <Badge colorScheme="yellow">On Hold</Badge>;
		case ListStatus.Dropped:
			return <Badge colorScheme="red">Dropped</Badge>;
	}
};
