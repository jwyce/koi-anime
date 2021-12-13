import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultUserFragment } from '@koi/controller';

export const AuthContext = React.createContext<{
	user: DefaultUserFragment | null;
	login: (user: DefaultUserFragment) => void;
	logout: () => void;
}>({
	user: null,
	login: () => {},
	logout: () => {},
});
interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<DefaultUserFragment | null>(null);

	return (
		<AuthContext.Provider
			value={{
				user,
				login: (user) => {
					setUser(user);
					AsyncStorage.setItem('user', JSON.stringify(user));
				},
				logout: () => {
					setUser(null);
					AsyncStorage.removeItem('user');
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
