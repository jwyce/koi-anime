import DataLoader from 'dataloader';
import { Anime } from '../entities/Anime';
import { Manga } from '../entities/Manga';
import { In } from 'typeorm';

export const createAnimeLoader = () =>
	new DataLoader<string, Anime | null>(async (slugs) => {
		const anime = await Anime.find({
			where: { slug: In(slugs as string[]) },
		});

		const slugsToAnime: Record<string, Anime> = {};
		anime.forEach((a) => {
			slugsToAnime[a.slug] = a;
		});

		return slugs.map((slug) => slugsToAnime[slug]);
	});

export const createMangaLoader = () =>
	new DataLoader<string, Manga | null>(async (slugs) => {
		const manga = await Manga.find({
			where: { slug: In(slugs as string[]) },
		});

		const slugsToManga: Record<string, Manga> = {};
		manga.forEach((m) => {
			slugsToManga[m.slug] = m;
		});

		return slugs.map((slug) => slugsToManga[slug]);
	});
