import {
	ApolloClient,
	InMemoryCache,
	HttpLink,
	from,
	makeVar,
} from '@apollo/client';
import { withApollo as createWithApollo } from 'next-apollo';

import { onError } from '@apollo/client/link/error';
import {
	PaginatedAnimeResponse,
	PaginatedListResponse,
	PaginatedMangaResponse,
} from '@koi/controller';

export const gqlErrors = makeVar<string[]>([]);

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach((err) => {
			console.log(err);
		});

		let errMsgs: string[] = [];
		graphQLErrors.forEach((x): any => {
			if (x.message.includes('Validation Error')) {
				(x.extensions as any).exception.validationErrors.forEach(
					(validationErr: any) => {
						Object.values(validationErr.constraints).forEach((message: any) => {
							errMsgs.push(message);
						});
					}
				);
			} else {
				errMsgs.push(x.message);
			}
		});
		gqlErrors(errMsgs);
	}

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					kitsuSearchAnime: {
						keyArgs: [],
						merge(
							existing: PaginatedAnimeResponse | undefined,
							incoming: PaginatedAnimeResponse
						): PaginatedAnimeResponse {
							return {
								...incoming,
								items: [...(existing?.items || []), ...incoming.items],
							};
						},
					},
					kitsuSearchManga: {
						keyArgs: [],
						merge(
							existing: PaginatedMangaResponse | undefined,
							incoming: PaginatedMangaResponse
						): PaginatedMangaResponse {
							return {
								...incoming,
								items: [...(existing?.items || []), ...incoming.items],
							};
						},
					},
					userList: {
						keyArgs: [],
						merge(
							existing: PaginatedListResponse | undefined,
							incoming: PaginatedListResponse,
							{ args }
						): PaginatedListResponse {
							let filteredExistingItems = [...(existing?.items || [])];
							if (
								args &&
								args.options.cursor === undefined &&
								existing &&
								incoming
							) {
								console.log('erased');
								filteredExistingItems = [];
							}

							let filteredIncomingItems = [...incoming.items];
							if (filteredExistingItems.length > 0) {
								filteredIncomingItems = incoming.items.filter((x) =>
									filteredExistingItems.every(
										(y) => y.resourceSlug !== x.resourceSlug
									)
								);
							}

							return {
								...incoming,
								items: [...filteredExistingItems, ...filteredIncomingItems],
							};
						},
					},
				},
			},
		},
	}),
});

export const withApollo = createWithApollo(client);
