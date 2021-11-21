import { MiddlewareFn } from 'type-graphql';

import { ONE_DAY, RATE_LIMIT_PREFIX } from '../helpers/constants';
import { redis } from '../redis/redis';
import { MyContext } from '../typings/MyContext';

export const rateLimit: (limit?: number) => MiddlewareFn<MyContext> =
	(limit = 50) =>
	async ({ context: { req }, info }, next) => {
		const key = `${RATE_LIMIT_PREFIX}:${info.fieldName}:${req.ip}`;

		const current = await redis.incr(key);
		if (current > limit) {
			throw new Error("sorry you're doing too much");
		} else if (current === 1) {
			await redis.expire(key, ONE_DAY);
		}

		return next();
	};
