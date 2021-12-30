import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMeQuery } from '@koi/controller';

export const useAlreadyAuth = () => {
	const { data, loading } = useMeQuery();
	const router = useRouter();

	useEffect(() => {
		if (!loading && data?.me) {
			router.replace('/');
		}
	}, [data?.me, loading, router]);
};
