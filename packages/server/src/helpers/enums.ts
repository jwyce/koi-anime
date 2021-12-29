import { registerEnumType } from 'type-graphql';

export enum ProfileIcon {
	KOI = 'koi',
	DRAGON = 'dragon',
	DOG = 'dog',
	FROG = 'frog',
	FOX = 'fox',
	SNAKE = 'snake',
	RABBIT = 'rabbit',
	CAT = 'cat',
	MONKEY = 'monkey',
	SEAHORSE = 'seahorse',
	TIGER = 'tiger',
	GOAT = 'goat',
	ROOSTER = 'rooster',
	PIG = 'pig',
	RAT = 'rat',
	TURTLE = 'turtle',
}

export enum ProfileColor {
	REDORANGE = 'redorange',
	PINK = 'pink',
	TEAL = 'teal',
	BLUE = 'blue',
	SALMON = 'salmon',
	PURPLE = 'purple',
}

export enum TitlePreference {
	CANONICAL = 'canonical',
	ROMANIZED = 'romanized',
	ENGLISH = 'english',
	JAPANESE = 'japanese',
}

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
	CURRENT = 'current',
	PLANNED = 'planned',
	COMPLETED = 'completed',
	ON_HOLD = 'on_hold',
	DROPPED = 'dropped',
}

export enum Media {
	ANIME = 'anime',
	MANGA = 'manga',
}

export enum SortBy {
	TITLE = 'title',
	UPDATED = 'updated',
	ADDED = 'added',
	PROGRESS = 'progress',
	LENGTH = 'length',
}

export enum Direction {
	ASC = 'asc',
	DESC = 'desc',
}

export const registerTypeGraphQLEnums = () => {
	registerEnumType(Media, {
		name: 'Media',
	});
	registerEnumType(SortBy, {
		name: 'SortBy',
	});
	registerEnumType(Direction, {
		name: 'Direction',
	});
	registerEnumType(ProfileIcon, {
		name: 'ProfileIcon',
	});

	registerEnumType(TitlePreference, {
		name: 'TitlePreference',
	});

	registerEnumType(ProfileColor, {
		name: 'ProfileColor',
		valuesConfig: {
			REDORANGE: { description: '#ff6250' },
			PINK: { description: '#EB79FA' },
			TEAL: { description: '#00C7B4' },
			BLUE: { description: '#869EFF' },
			SALMON: { description: '#FF8691' },
			PURPLE: { description: '#555B8C' },
		},
	});

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
		name: 'SongType',
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
