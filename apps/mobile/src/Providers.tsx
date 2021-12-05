import { NativeBaseProvider, StatusBar } from 'native-base';
import React from 'react';

import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from './AuthProvider';
import { Routes } from './routes/Routes';
import { client } from './stores/apollo';
import { theme } from './theme/theme';

export const Providers: React.FC<{}> = ({}) => {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<NativeBaseProvider theme={theme}>
					<StatusBar />
					<Routes theme={theme} />
				</NativeBaseProvider>
			</AuthProvider>
		</ApolloProvider>
	);
};
