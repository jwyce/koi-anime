import { TitlePreference } from './../helpers/enums';
import { User } from './../entities/User';

export const getPreferredName = (
	me: User | null,
	en: string,
	jp: string,
	en_jp: string,
	canon: string
) => {
	if (me) {
		switch (me.titlePreference) {
			case TitlePreference.CANONICAL:
				return canon;
			case TitlePreference.JAPANESE:
				return jp === '' ? canon : jp;
			case TitlePreference.ENGLISH:
				return en;
			case TitlePreference.ROMANIZED:
				return en_jp === '' ? canon : en_jp;
		}
	}
	return canon;
};
