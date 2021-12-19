import { Request, Response } from 'express';
import { Redis } from 'ioredis';

import { createSongsLoader } from '../loaders/createAnimeSongLoader';

export type MyContext = {
	req: Request;
	res: Response;
	redis: Redis;
	songsLoader: ReturnType<typeof createSongsLoader>;
};

declare module 'express-session' {
	interface Session {
		userId: number;
	}
}
