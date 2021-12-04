import dayjs from 'dayjs';
import { MiddlewareFn } from 'type-graphql';

import { User } from '../entities/User';
import { MyContext } from '../typings/MyContext';
import { accountLockout } from '../utils/accountLockout';

export const isAccountLocked: MiddlewareFn<MyContext> = async (
	{ context },
	next
) => {
	const user = await User.findOne(context.req.session.userId);
	if (user) {
		const lockoutInfo = accountLockout(user.failedAttempts ?? 0);
		if (lockoutInfo && dayjs().isBefore(dayjs(user.lockoutEnd))) {
			throw new Error(lockoutInfo.message);
		}
	}
	return next();
};
