import { registerEnumType } from 'type-graphql';

export enum AnimeSubtype {
	ONA = 'ona',
	OVA = 'ova',
	TV = 'tv',
	MOVIE = 'movie',
	SPECIAL = 'special',
}

export enum AgeRating {
	G = 'g',
	PG = 'pg',
	R = 'r',
	R18 = 'r18',
}

export enum Status {
	CURRENT = 'current',
	FINISHED = 'finished',
	TBA = 'tba',
	UNRELEASED = 'unreleased',
	UPCOMING = 'upcoming',
}

export enum SongType {
	OP = 'op',
	ED = 'ed',
}

export enum MangaSubtype {
	DOUJIN = 'doujin',
	MANGA = 'manga',
	MANHUA = 'manhua',
	MANHWA = 'manhwa',
	NOVEL = 'novel',
	OEL = 'oel',
	ONESHOT = 'oneshot',
}

export enum ResourceType {
	ANIME = 'anime',
	MANGA = 'manga',
	OP_SONG = 'op_song',
	ED_SONG = 'ed_song',
	M_CHARACTER = 'm_character',
	F_CHARACTER = 'f_character',
}

export enum ListStatus {
	WANT_TO_WATCH = 'want_to_watch',
	WATCHING = 'watching',
	COMPLETED = 'completed',
	ON_HOLD = 'on_hold',
	DROPPED = 'dropped',
}

export const registerTypeGraphQLEnums = () => {
	registerEnumType(AnimeSubtype, {
		name: 'AnimeSubtype',
		valuesConfig: {
			ONA: { description: 'Original Net Animation' },
			OVA: { description: 'Original Video Animation' },
		},
	});

	registerEnumType(AgeRating, {
		name: 'AgeRating',
		valuesConfig: {
			G: { description: 'General Audiences' },
			PG: { description: 'Parental Guidance Suggested' },
			R: { description: 'Restricted' },
			R18: { description: 'Explicit' },
		},
	});

	registerEnumType(Status, {
		name: 'Status',
	});

	registerEnumType(SongType, {
		name: 'Status',
		valuesConfig: {
			OP: { description: 'Anime Opening' },
			ED: { description: 'Anime Ending' },
		},
	});

	registerEnumType(MangaSubtype, {
		name: 'MangaSubtype',
		valuesConfig: {
			OEL: { description: 'Original English-Language' },
		},
	});

	registerEnumType(ResourceType, {
		name: 'ResourceType',
	});

	registerEnumType(ListStatus, {
		name: 'ListStatus',
	});
};
