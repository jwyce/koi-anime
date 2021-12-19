import DataLoader from 'dataloader';
import { Song } from '../entities/Song';
import { In } from 'typeorm';

export const createSongsLoader = () =>
	new DataLoader<number, Song[]>(async (animeIds) => {
		const songs = await Song.find({
			where: { animeID: In(animeIds as number[]) },
		});

		const animeIdToSongs: Record<number, Song[]> = {};
		songs.forEach((s) => {
			if (s.animeID in animeIdToSongs) {
				animeIdToSongs[s.animeID].push(s);
			} else {
				animeIdToSongs[s.animeID] = [s];
			}
		});

		return animeIds.map((animeId) => animeIdToSongs[animeId]);
	});
