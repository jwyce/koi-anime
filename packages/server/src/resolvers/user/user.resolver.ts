import argon2 from 'argon2';
import {
	Arg,
	Ctx,
	FieldResolver,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
	UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';

import { registerSchema, resetPasswordSchema } from '@koi/controller';

import { List } from '../../entities/List';
import { Vote } from '../../entities/Vote';
import { User } from '../../entities/User';
import {
	CONFIRM_USER_PREFIX,
	COOKIE_NAME,
	FORGET_PASSWORD_PREFIX,
} from '../../helpers/constants';
import { Media } from '../../helpers/enums';
import { isAccountLocked } from '../../middleware/isAccountLocked';
import { isAuth } from '../../middleware/isAuth';
import { rateLimit } from '../../middleware/rateLimit';
import { MyContext } from '../../typings/MyContext';
import { accountLockout } from '../../utils/accountLockout';
import { randomUserProfileTheme } from '../../utils/randomUserProfileTheme';
import { sendEmail } from '../../utils/sendEmail';
import { validateSchema } from '../../utils/validateSchema';
import { PreferencesInput } from './PreferencesInput';
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

	@Query(() => [User])
	users() {
		return User.find();
	}

	@Query(() => User)
	user(@Arg('username') username: string) {
		return User.findOne({ where: { username } });
	}

	@Query(() => Int)
	@UseMiddleware(isAuth)
	async userLevel(@Ctx() { req }: MyContext) {
		let level = 0;
		const list = await List.find({ where: { userID: req.session.userId } });
		const animeCount = list.filter((x) => x.mediaType === Media.ANIME).length;
		const mangaCount = list.filter((x) => x.mediaType === Media.MANGA).length;
		const voteCount = await Vote.count({
			where: { userID: req.session.userId },
		});

		if (animeCount > 1) level++;
		if (animeCount > 10) level++;
		if (animeCount > 50) level++;
		if (animeCount > 100) level++;
		if (animeCount > 250) level++;
		if (animeCount > 500) level++;
		if (animeCount > 1000) level++;

		if (mangaCount > 1) level++;
		if (mangaCount > 10) level++;
		if (mangaCount > 50) level++;
		if (mangaCount > 100) level++;
		if (mangaCount > 250) level++;
		if (mangaCount > 500) level++;
		if (mangaCount > 1000) level++;

		if (voteCount > 10) level++;
		if (voteCount > 100) level++;
		if (voteCount > 1000) level++;
		if (voteCount > 5000) level++;
		if (voteCount > 10000) level++;
		if (voteCount > 25000) level++;

		return level;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(isAuth)
	async confirmEmail(
		@Arg('token') token: string,
		@Ctx() { redis }: MyContext
	): Promise<boolean> {
		const userId = await redis.get(CONFIRM_USER_PREFIX + token);
		if (!userId) {
			return false;
		}

		await User.update({ id: parseInt(userId, 10) }, { isConfirmed: true });
		await redis.del(CONFIRM_USER_PREFIX + token);

		return true;
	}

	@Mutation(() => UserResponse)
	@UseMiddleware(isAuth)
	async changePassword(
		@Arg('newPassword') newPassword: string,
		@Arg('confirmPassword') confirmPassword: string,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const errors = await validateSchema(resetPasswordSchema, {
			newPassword,
			confirmPassword,
		});
		if (errors) {
			return { errors };
		}

		const user = await User.findOne(req.session.userId);
		if (user) {
			await User.update(
				{ id: user.id },
				{ password: await argon2.hash(newPassword) }
			);
		}

		return { user };
	}

	@Mutation(() => UserResponse)
	async resetPassword(
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

		sendEmail(
			email,
			'Reset Password Link 🔑',
			`<a href="${process.env.CORS_ORIGIN}/reset-password/${token}">reset password</a>`
		);

		return true;
	}

	@Mutation(() => Boolean)
	@UseMiddleware(rateLimit(10))
	async sendConfirmation(
		@Ctx() { redis }: MyContext,
		@Arg('email') email: string
	) {
		const user = await User.findOne({ email });

		if (user) {
			const token = v4();
			await redis.set(
				CONFIRM_USER_PREFIX + token,
				user.id,
				'ex',
				1000 * 60 * 60 * 24 * 3 // 3 days
			);

			sendEmail(
				user.email,
				'Confirm Email ✅',
				`<a href="${process.env.CORS_ORIGIN}/confirm-email/${token}">confirm email</a>`
			);
		}

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
	@UseMiddleware(isAuth)
	async updatePreferences(
		@Arg('options') options: PreferencesInput,
		@Ctx() { req }: MyContext
	): Promise<UserResponse> {
		const user = await User.findOne(req.session.userId);
		if (user) {
			user.titlePreference = options.titlePreference;
			user.profileColor = options.profileColor;
			user.profileIcon = options.profileIcon;
			user.showNSFW = options.showNSFW;

			if (options.username) {
				user.username = options.username;
			}
			if (options.email) {
				user.email = options.email;
				user.isConfirmed = false;
			}

			user.save();
		}

		return { user };
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

		sendEmail(
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
		user.failedAttempts = 0;
		user.save();

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

	@Mutation(() => Boolean)
	deleteAccount(@Ctx() { req, res }: MyContext) {
		return new Promise((resolve) => {
			const userId = req.session.userId;
			req.session.destroy((err) => {
				res.clearCookie(COOKIE_NAME);

				if (err) {
					console.log(err);
					resolve(false);
					return;
				}

				User.delete(userId)
					.then(() => resolve(true))
					.catch((err) => {
						console.log(err);
						resolve(false);
						return;
					});
			});
		});
	}
}
