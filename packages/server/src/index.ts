import 'reflect-metadata';
import 'dotenv-safe/config';

import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import path from 'path';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { __prod__, COOKIE_NAME, ONE_YEAR } from './helpers/constants';
import { MyContext } from './typings/MyContext';
import { registerTypeGraphQLEnums } from './helpers/enums';
import { redis } from './redis/redis';

const main = async () => {
	const conn = await createConnection({
		type: 'postgres',
		url: process.env.DATABASE_URL,
		logging: true,
		synchronize: false,
		entities: [path.join(__dirname, './entities/*')],
		migrations: [path.join(__dirname, './migrations/*')],
	});
	await conn.runMigrations();

	const app = express();

	const RedisStore = connectRedis(session);

	app.set('trust proxy', 1);
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
				maxAge: 1000 * ONE_YEAR * 10, // 10 years in millis
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

	registerTypeGraphQLEnums();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			// resolvers: [UserResolver, AnimeResolver],
			resolvers: [__dirname + '/**/*.resolver.{ts,js}'],
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
	console.error(err);
});
