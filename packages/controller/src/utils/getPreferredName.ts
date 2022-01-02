import { MeDocument, MeQuery, TitlePreference } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';

export const getPreferredName = (
	en: string,
	jp: string,
	en_jp: string,
	canon: string
) => {
	const client = useApolloClient();
	const meQuery = client.readQuery<MeQuery>({
		query: MeDocument,
	});

	if (meQuery) {
		switch (meQuery.me?.titlePreference) {
			case TitlePreference.Canonical:
				return canon;
			case TitlePreference.Japanese:
				return jp === '' ? canon : jp;
			case TitlePreference.English:
				return en;
			case TitlePreference.Romanized:
				return en_jp === '' ? canon : en_jp;
		}
	}
	return canon;
};
