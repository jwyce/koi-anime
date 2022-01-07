import { random } from 'lodash';

import { Matchup, Resource } from '@/resolvers/vote/Matchup';

import { GetRatedResource } from '../repo/TopRatedRepo';

export const getRandomMatchup = async (
	options: Resource[]
): Promise<Matchup | null> => {
	if (options.length < 2) {
		return null;
	}
	const first = await getRandomResource(options, 1);
	const firstApproval = await GetRatedResource(first.type, first.slug);
	const approvalPer = firstApproval
		? firstApproval.likes /
		  (parseInt(`${firstApproval.likes}`) +
				parseInt(`${firstApproval.dislikes}`))
		: 0;

	const second = await getRandomResource(options, 1, first.slug, approvalPer);

	return { first, second };
};

const getRandomResource = async (
	options: Resource[],
	count: number,
	notThisOne?: string,
	percent?: number
): Promise<Resource> => {
	const choice = options[random(0, options.length - 1)];
	const choiceApprvoal = await GetRatedResource(choice.type, choice.slug);
	const approvalPer = choiceApprvoal
		? choiceApprvoal.likes /
		  (parseInt(`${choiceApprvoal.likes}`) +
				parseInt(`${choiceApprvoal.dislikes}`))
		: 0;

	if (percent && Math.abs(percent - approvalPer) > 0.1 && count < 20) {
		return await getRandomResource(options, count + 1, notThisOne, percent);
	}

	if (notThisOne && count < 25 && choice.slug === notThisOne) {
		return await getRandomResource(options, count + 1, notThisOne);
	}
	return choice;
};
