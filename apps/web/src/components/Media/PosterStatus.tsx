import { Badge } from '@chakra-ui/react';
import { Status } from '@koi/controller';
import React from 'react';

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
