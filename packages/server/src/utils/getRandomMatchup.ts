import { Matchup, Resource } from '@/resolvers/vote/Matchup';
import { random } from 'lodash';

export const getRandomMatchup = (options: Resource[]): Matchup | null => {
	if (options.length < 2) {
		return null;
	}
	const first = getRandomResource(options);
	const second = getRandomResource(options, first.slug);

	return { first, second };
};

const getRandomResource = (options: Resource[], notThisOne?: string) => {
	const choice = options[random(0, options.length - 1)];
	if (notThisOne && choice.slug !== notThisOne) {
		getRandomResource(options, notThisOne);
	}
	return choice;
};
