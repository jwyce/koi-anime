import 'reflect-metadata';
import 'dotenv-safe/config';

import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { __prod__, COOKIE_NAME } from './helpers/constants';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';
import { MyContext } from './typings/MyContext';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: true,
		synchronize: true,
		entities: [User],
		migrations: [path.join(__dirname, './migrations/*')],
	});
	await conn.runMigrations();

	const app = express();

	const RedisStore = connectRedis(session);
	const redis = new Redis(process.env.REDIS_URL);

	app.use(
		cors({
			origin: process.env.CORS_ORIGIN,
			credentials: true,
		})
	);

	app.use(
		session({
			name: COOKIE_NAME,
			store: new RedisStore({
				client: redis,
				disableTouch: true,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
				httpOnly: true,
				sameSite: 'lax', // csrf
				secure: __prod__, // cookie only works in https
				domain: __prod__ ? '.koianimelist.com' : undefined,
			},
			saveUninitialized: false,
			secret: process.env.SESSION_SECRET,
			resave: false,
		})
	);

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
			validate: false,
		}),
		context: ({ req, res }): MyContext => ({
			req,
			res,
			redis,
		}),
	});

	app.get('/', (_req, res) => {
		res.send('hello world!');
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(process.env.PORT, () => {
		console.log(`🚀 server started on http://localhost:${process.env.PORT}`);
	});
};

main().catch((err) => {
	console.log(err);
});
