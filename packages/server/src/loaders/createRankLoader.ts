import DataLoader from 'dataloader';
import { Field, ObjectType } from 'type-graphql';

import { ResourceType } from '@/helpers/enums';

import { GetTopRatedResouces } from '../repo/TopRatedRepo';

@ObjectType()
export class Rank {
	@Field(() => Number)
	rank: number;

	@Field()
	approval: string;
}

export const createRankLoader = () =>
	new DataLoader<{ slugId: string; type: ResourceType | null }, Rank | null>(
		async (keys) => {
			const slugs = keys.map((x) => x.slugId);
			const votes = await GetTopRatedResouces(keys[0].type);
			const slugsToRank: Record<string, Rank> = {};
			votes.forEach((v) => {
				slugsToRank[v.slug] = { rank: v.approval_rank, approval: v.approval };
			});

			return slugs.map((slug) => slugsToRank[slug]);
		}
	);
