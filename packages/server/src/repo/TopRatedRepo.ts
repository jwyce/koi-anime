import { getManager } from 'typeorm';

import { ResourceType } from '../helpers/enums';

interface RankedResource {
	approval_rank: number;
	likes: number;
	dislikes: number;
	slug: string;
	approval: string;
}

export const GetRatedResource = async (type: ResourceType, slug: string) => {
	const entityManager = getManager();
	const resource: RankedResource[] = await entityManager.query(
		`
    select
       "votedFor"                                         resource,
       likes,
       COALESCE(dislikes, 0)                              dislikes,
       L.rank,
       concat(to_char((likes / (likes::numeric + coalesce(dislikes, 0)))*100, '999.9'), '%') approval,
       rank() over (order by (likes / (likes::numeric + coalesce(dislikes, 0)))*100 desc) approval_rank
    from (select "votedFor", sum(count) likes, RANK() OVER(ORDER BY SUM(count) DESC) rank
          from vote
          where "resourceType" = $1
          group by "votedFor"
          order by likes desc) L
    left join (
        select "votedAgainst", sum(count) dislikes, RANK() OVER(ORDER BY SUM(count) DESC) rank
        from vote
        where "resourceType" = $1
        group by "votedAgainst"
        order by dislikes desc
    ) D on L."votedFor" = D."votedAgainst"
    where "votedFor" = $2;`,
		[type, slug]
	);
	return resource[0];
};

export const GetTopRatedResouces = async (
	type: ResourceType | null,
	limit = 1000,
	skip = 0
) => {
	const entityManager = getManager();
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
          ) D on L."votedFor" = D."votedAgainst"
          limit $2
          offset $3;`,
		[type, limit, skip]
	);
	return votes;
};
