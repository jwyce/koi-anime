import { Badge } from '@chakra-ui/react';
import { AnimeSubtype, MangaSubtype } from '@koi/controller';
import React from 'react';

interface MediaSubtypesProps {
	type: 'anime' | 'manga' | 'character';
	subtype: AnimeSubtype | MangaSubtype | 'male' | 'female' | undefined;
}

export const MediaSubtypes: React.FC<MediaSubtypesProps> = ({
	type,
	subtype,
}) => {
	if (type === 'anime') {
		switch (subtype as AnimeSubtype) {
			case AnimeSubtype.Movie:
				return <Badge colorScheme="purple">Movie</Badge>;
			case AnimeSubtype.Ona:
				return <Badge colorScheme="cyan">Ona</Badge>;
			case AnimeSubtype.Ova:
				return <Badge colorScheme="teal">Ova</Badge>;
			case AnimeSubtype.Special:
				return <Badge colorScheme="green">Special</Badge>;
			case AnimeSubtype.Tv:
				return <Badge colorScheme="orange">Tv</Badge>;
		}
	} else if (type === 'manga') {
		switch (subtype as MangaSubtype) {
			case MangaSubtype.Doujin:
				return <Badge colorScheme="red">Doujin</Badge>;
			case MangaSubtype.Manga:
				return <Badge colorScheme="yellow">Manga</Badge>;
			case MangaSubtype.Manhua:
				return <Badge colorScheme="pink">Manhua</Badge>;
			case MangaSubtype.Manhwa:
				return <Badge colorScheme="purple">Manhwa</Badge>;
			case MangaSubtype.Oel:
				return <Badge colorScheme="teal">Oel</Badge>;
			case MangaSubtype.Oneshot:
				return <Badge colorScheme="cyan">Oneshot</Badge>;
		}
	} else if (type === 'character') {
		switch (subtype as 'male' | 'female') {
			case 'male':
				return <Badge colorScheme="blue">Male</Badge>;
			case 'female':
				return <Badge colorScheme="pink">Female</Badge>;
		}
	}
	return <Badge>{subtype}</Badge>;
};
