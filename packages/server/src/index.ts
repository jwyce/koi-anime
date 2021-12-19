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
import {
	fieldExtensionsEstimator,
	getComplexity,
	simpleEstimator,
} from 'graphql-query-complexity';
import { createSongsLoader } from './loaders/createAnimeSongLoader';

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
	const schema = await buildSchema({
		resolvers: [__dirname + '/**/*.resolver.{ts,js}'],
	});

	// TODO: write data loader(s) for rank
	const apolloServer = new ApolloServer({
		schema,
		context: ({ req, res }): MyContext => ({
			req,
			res,
			redis,
			songsLoader: createSongsLoader(),
		}),
		plugins: [
			{
				requestDidStart: () => ({
					didResolveOperation({ request, document }) {
						/**
						 * This provides GraphQL query analysis to be able to react on complex queries to your GraphQL server.
						 * This can be used to protect your GraphQL servers against resource exhaustion and DoS attacks.
						 * More documentation can be found at https://github.com/ivome/graphql-query-complexity.
						 */
						const complexity = getComplexity({
							schema,
							operationName: request.operationName,
							query: document,
							variables: request.variables,
							estimators: [
								fieldExtensionsEstimator(),
								simpleEstimator({ defaultComplexity: 1 }),
							],
						});

						if (complexity > 250) {
							throw new Error(
								`Sorry, too complicated query! ${complexity} is over 250 that is the max allowed complexity.`
							);
						}

						// here we can e.g. subtract the complexity point from hourly API calls limit.
						console.log('Used query complexity points:', complexity);
					},
				}),
			},
		],
	});

	app.get('/', (_req, res) => {
		res.send('hello world!');
	});

	apolloServer.applyMiddleware({
		app,
		cors: false,
	});

	app.listen(process.env.PORT, () => {
		console.log(
			`🚀 server started on http://localhost:${process.env.PORT}/graphql`
		);
	});
};

main().catch((err) => {
	console.error(err);
});
