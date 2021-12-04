import argon2 from 'argon2';
import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';

import { registerSchema, resetPasswordSchema } from '@koi/controller';

import { User } from '../../entities/User';
import {
	CONFIRM_USER_PREFIX,
	COOKIE_NAME,
	FORGET_PASSWORD_PREFIX,
} from '../../helpers/constants';
import { isAccountLocked } from '../../middleware/isAccountLocked';
import { rateLimit } from '../../middleware/rateLimit';
import { MyContext } from '../../typings/MyContext';
import { accountLockout } from '../../utils/accountLockout';
import { randomUserProfileTheme } from '../../utils/randomUserProfileTheme';
import { sendEmail } from '../../utils/sendEmail';
import { validateSchema } from '../../utils/validateSchema';
import { RegisterInput } from './RegisterInput';
import { UserResponse } from './UserResponse';

@Resolver(User)
export class UserResolver {
	@FieldResolver(() => String)
	email(@Root() user: User, @Ctx() { req }: MyContext) {
		// this is the current user and it's okay to show them their own email
		if (req.session.userId === user.id) {
			return user.email;
		}

		// current user wants to see somone else's email
		return '';
	}

	@Mutation(() => UserResponse)
	async changePassword(
		@Arg('token') token: string,
		@Arg('newPassword') newPassword: string,
		@Arg('confirmPassword') confirmPassword: string,
		@Ctx() { redis, req }: MyContext
	): Promise<UserResponse> {
		const errors = await validateSchema(resetPasswordSchema, {
			newPassword,
			confirmPassword,
		});
		if (errors) {
			return { errors };
		}

		const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);
		if (!userId) {
			return {
				errors: [
					{
						field: 'token',
						message: 'token expired',
					},
				],
			};
		}

		const userIdNum = parseInt(userId);
		const user = await User.findOne(userIdNum);
		if (!user) {
			return {
				errors: [
					{
						field: 'token',
						message: 'user no longer exists',
					},
				],
			};
		}

		await User.update(
			{ id: userIdNum },
			{ password: await argon2.hash(newPassword) }
		);

		redis.del(FORGET_PASSWORD_PREFIX + token);

		// login user after change password
		req.session.userId = user.id;

		return { user };
	}

	@Mutation(() => Boolean)
	@UseMiddleware(rateLimit(10))
	async forgotPassword(
		@Arg('email') email: string,
		@Ctx() { redis }: MyContext
	) {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			// the email is not in the db
			return true;
		}

		const token = v4();
		await redis.set(
			FORGET_PASSWORD_PREFIX + token,
			user.id,
			'ex',
			1000 * 60 * 60 * 24 * 3 // 3 days
		);

		await sendEmail(
			email,
			'Reset Password Link 🔑',
			`<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`
		);

		return true;
	}

	@Query(() => User, { nullable: true })
	me(@Ctx() { req }: MyContext) {
		if (!req.session.userId) {
			return null;
		}

		return User.findOne(req.session.userId);
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(rateLimit(10))
	async register(
		@Arg('options') options: RegisterInput,
		@Ctx() { req, redis }: MyContext
	): Promise<UserResponse> {
		const errors = await validateSchema(registerSchema, options);
		if (errors) {
			return { errors };
		}

		const hashedPassword = await argon2.hash(options.password);
		let user;

		try {
			const { profileColor, profileIcon } = randomUserProfileTheme();
			const result = await getConnection()
				.createQueryBuilder()
				.insert()
				.into(User)
				.values({
					username: options.username,
					email: options.email,
					password: hashedPassword,
					profileColor,
					profileIcon,
				})
				.returning('*')
				.execute();

			user = result.raw[0];
		} catch (error) {
			console.log('err: ', error);
		}

		// store user id session
		// this will set a cookie on the user
		// keep them logged in
		req.session!.userId = user.id;

		const token = v4();
		await redis.set(
			CONFIRM_USER_PREFIX + token,
			user.id,
			'ex',
			1000 * 60 * 60 * 24 * 3 // 3 days
		);

		await sendEmail(
			user.email,
			'Confirm Email ✅',
			`<a href="${process.env.CORS_ORIGIN}/confirm-email/${token}">confirm email</a>`
		);

		return { user };
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(rateLimit(20))
	@UseMiddleware(isAccountLocked)
	async login(
		@Arg('usernameOrEmail') usernameOrEmail: string,
		@Arg('password') password: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne(
			usernameOrEmail.includes('@')
				? { where: { email: usernameOrEmail } }
				: { where: { username: usernameOrEmail } }
		);

		if (!user) {
			return {
				errors: [
					{
						field: 'usernameOrEmail',
						message: "username doesn't exit",
					},
				],
			};
		}

		const valid = await argon2.verify(user.password, password);

		if (!valid) {
			const accountLockoutInfo = accountLockout(++user.failedAttempts);
			if (accountLockoutInfo) {
				user.lockoutEnd = accountLockoutInfo.lockout.toDate();
			}

			user.save();

			if (accountLockoutInfo) {
				throw new Error(accountLockoutInfo.message);
			}
			return {
				errors: [
					{
						field: 'password',
						message: 'incorrect password',
					},
				],
			};
		}

		req.session!.userId = user.id;

		return {
			user,
		};
	}

	@Mutation(() => Boolean)
	logout(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) =>
			req.session.destroy((err) => {
				res.clearCookie(COOKIE_NAME);

				if (err) {
					console.log(err);
					resolve(false);
					return;
				}
				resolve(true);
			})
		);
	}
}
