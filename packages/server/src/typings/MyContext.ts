import { Request, Response } from 'express';
import { Redis } from 'ioredis';

import {
	createAnimeLoader,
	createMangaLoader,
} from '@/loaders/createMediaLoader';
import { createSongsLoader } from '@/loaders/createAnimeSongLoader';
import { createRankLoader } from '@/loaders/createRankLoader';

export type MyContext = {
	req: Request;
	res: Response;
	redis: Redis;
	songsLoader: ReturnType<typeof createSongsLoader>;
	animeLoader: ReturnType<typeof createAnimeLoader>;
	mangaLoader: ReturnType<typeof createMangaLoader>;
	rankLoader: ReturnType<typeof createRankLoader>;
};

declare module 'express-session' {
	interface Session {
		userId: number;
	}
}
