import {
	ApolloClient,
	from,
	HttpLink,
	InMemoryCache,
	makeVar,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

export const gqlErrors = makeVar<string[]>([]);

const httpLink = new HttpLink({
	uri: 'http://172.18.51.248:4000/graphql',
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

export const client = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					// posts: {
					// 	keyArgs: [],
					// 	merge(
					// 		existing: PaginatedPosts | undefined,
					// 		incoming: PaginatedPosts
					// 	): PaginatedPosts {
					// 		return {
					// 			...incoming,
					// 			posts: [...(existing?.posts || []), ...incoming.posts],
					// 		};
					// 	},
					// },
				},
			},
		},
	}),
});
