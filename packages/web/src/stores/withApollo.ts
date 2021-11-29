import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { withApollo as createWithApollo } from 'next-apollo';

import { onError } from '@apollo/client/link/error';

const httpLink = new HttpLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			);
		});

	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
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

export const withApollo = createWithApollo(client);
