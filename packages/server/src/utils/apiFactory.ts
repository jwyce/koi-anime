import _ from 'lodash';
import {
	AgeRating,
	AnimeSubtype,
	MangaSubtype,
	SongType,
	Status,
} from '../helpers/enums';

export const apiAnimeFactory = (apiData: any) => {
	const a = apiData;

	const subtype =
		a.attributes.subtype === 'music' ? 'tv' : a.attributes.subtype;

	return {
		id: 0,
		apiID: a.id as number,
		subtype: (subtype?.toLowerCase() as AnimeSubtype) ?? AnimeSubtype.TV,
		synopsis: (a.attributes.synopsis as string) ?? '',
		englishTitle: (a.attributes.titles.en as string) ?? '',
		romajiTitle: (a.attributes.titles.en_jp as string) ?? '',
		japaneseTitle: (a.attributes.titles.ja_jp as string) ?? '',
		canonicalTitle: (a.attributes.canonicalTitle as string) ?? '',
		slug: a.attributes.slug as string,
		startDate: (a.attributes.startDate as Date) ?? Date.now(),
		endDate: (a.attributes.endDate as Date) ?? Date.now(),
		tba: a.attributes.tba ?? '',
		ageRating:
			(a.attributes.ageRating?.toLowerCase() as AgeRating) ?? AgeRating.G,
		ageRatingGuide: a.attributes.ageRatingGuide ?? '',
		status: (a.attributes.status?.toLowerCase() as Status) ?? Status.TBA,
		posterLinkOriginal: a.attributes.posterImage.original ?? '',
		posterLinkSmall: a.attributes.posterImage.small ?? '',
		coverLinkOriginal:
			a.attributes.coverImage?.original ??
			'https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png',
		coverLinkSmall:
			a.attributes.coverImage?.small ??
			'https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png',
		episodeCount: a.attributes.episodeCount,
		youtubeVideoId: a.attributes.youtubeVideoId ?? '',
		nsfw: a.attributes.nsfw ?? false,
		studios: [] as string[],
	};
};

export const apiSongFactory = (song: string, songType: SongType) => {
	const s = song;
	const name = s.match(/(?:"[^"]*"|^[^"]*$)/)![0].replace(/"/g, '');
	const artist = s.substring(s.lastIndexOf(' by ') + 4);

	return {
		id: 0,
		animeID: 0,
		animeAPIID: 0,
		name,
		artist,
		fullTitle: `${name} by ${artist}`,
		slug: name.replace(/[^\w\s]/gi, '').replace(/[\s]/gi, '-'),
		songType,
	};
};

export const apiCharacterFactory = (apiData: any, mediaID: number) => {
	const c = apiData;

	const femaleIndicators = ['she', 'her', 'hers', 'herself'];
	const maleIndicators = ['he', 'him', 'his', 'himself'];
	const otherIndicators = [
		'they',
		'their',
		'theirs',
		'themselves',
		'it',
		'its',
		'itself',
	];
	let femaleCount = 0;
	let maleCount = 0;
	let otherCount = 0;

	c.description?.en
		?.toLowerCase()
		.split(' ')
		.forEach((word: any) => {
			femaleCount += femaleIndicators.includes(word) ? 1 : 0;
			maleCount += maleIndicators.includes(word) ? 1 : 0;
			otherCount += otherIndicators.includes(word) ? 1 : 0;
		});

	let countMap = [
		{ gender: 'female', count: femaleCount },
		{ gender: 'male', count: maleCount },
		{ gender: 'other', count: otherCount },
	];

	countMap = _.orderBy(countMap, ['count'], ['desc']);

	return {
		id: 0,
		malID: mediaID,
		apiID: c.id,
		animeID: 0,
		animeAPIID: 0,
		englishName: c.names.localized.en ?? '',
		japaneseName: c.names.localized.ja_jp ?? '',
		canonicalName: c.names.canonical ?? '',
		slug: c.slug ?? '',
		gender: countMap[0].gender,
		description: c.description?.en ?? '',
		imageOriginal: c.image?.original?.url ?? '',
	};
};

export const apiMangaFactory = (apiData: any) => {
	const a = apiData;
	return {
		id: 0,
		apiID: a.id as number,
		subtype:
			(a.attributes.subtype?.toLowerCase() as MangaSubtype) ??
			MangaSubtype.MANGA,
		synopsis: (a.attributes.synopsis as string) ?? '',
		englishTitle: (a.attributes.titles.en as string) ?? '',
		romajiTitle: (a.attributes.titles.en_jp as string) ?? '',
		japaneseTitle: (a.attributes.titles.ja_jp as string) ?? '',
		canonicalTitle: (a.attributes.canonicalTitle as string) ?? '',
		slug: a.attributes.slug as string,
		startDate: (a.attributes.startDate as Date) ?? Date.now(),
		endDate: (a.attributes.endDate as Date) ?? Date.now(),
		tba: a.attributes.tba ?? '',
		ageRating:
			(a.attributes.ageRating?.toLowerCase() as AgeRating) ?? AgeRating.G,
		ageRatingGuide: a.attributes.ageRatingGuide ?? '',
		status: (a.attributes.status?.toLowerCase() as Status) ?? Status.TBA,
		posterLinkOriginal: a.attributes.posterImage.original ?? '',
		posterLinkSmall: a.attributes.posterImage.small ?? '',
		coverLinkOriginal:
			a.attributes.coverImage?.original ??
			'https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png',
		coverLinkSmall:
			a.attributes.coverImage?.small ??
			'https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png',
		chapterCount: a.attributes.chapterCount ?? 0,
		volumeCount: a.attributes.volumeCount ?? 0,
		serialization: a.attributes.serialization ?? '',
	};
};
