import DataLoader from 'dataloader';
import { Field, ObjectType } from 'type-graphql';
import { getManager } from 'typeorm';

import { ResourceType } from '@/helpers/enums';

@ObjectType()
export class Rank {
	@Field(() => Number)
	rank: number;

	@Field()
	approval: string;
}

@ObjectType()
class RankedResource {
	@Field(() => Number)
	approval_rank: number;

	@Field(() => Number)
	likes: number;

	@Field(() => Number)
	dislikes: number;

	@Field()
	slug: string;

	@Field()
	approval: string;
}

export const createRankLoader = () =>
	new DataLoader<{ slugId: string; type: ResourceType | null }, Rank | null>(
		async (keys) => {
			const entityManager = getManager();
			const slugs = keys.map((x) => x.slugId);
			const votes: RankedResource[] = await entityManager.query(
				`select 
          "votedFor" slug, 
          likes, 
          COALESCE(dislikes, 0) dislikes, 
          L.rank, 
          concat(
            to_char(
              (
                likes / (
                  likes :: numeric + coalesce(dislikes, 0)
                )
              )* 100, 
              '999.9'
            ), 
            '%'
          ) approval, 
          rank() over (
            order by 
              (
                likes / (
                  likes :: numeric + coalesce(dislikes, 0)
                )
              )* 100 desc
          ) approval_rank 
        from 
          (
            select 
              "votedFor", 
              sum(count) likes, 
              RANK() OVER(
                ORDER BY 
                  SUM(count) DESC
              ) rank 
            from 
              vote 
            where 
              "resourceType" = $1
            group by 
              "votedFor" 
            order by 
              likes desc
          ) L 
          left join (
            select 
              "votedAgainst", 
              sum(count) dislikes, 
              RANK() OVER(
                ORDER BY 
                  SUM(count) DESC
              ) rank 
            from 
              vote 
            where 
              "resourceType" = $1
            group by 
              "votedAgainst" 
            order by 
              dislikes desc
          ) D on L."votedFor" = D."votedAgainst";`,
				[keys[0].type]
			);

			const slugsToRank: Record<string, Rank> = {};
			votes.forEach((v) => {
				slugsToRank[v.slug] = { rank: v.approval_rank, approval: v.approval };
			});

			return slugs.map((slug) => slugsToRank[slug]);
		}
	);
