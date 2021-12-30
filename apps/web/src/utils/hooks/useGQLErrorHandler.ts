import { useEffect } from 'react';

import { useReactiveVar } from '@apollo/client';

import { gqlErrors as gqlErrorsVar } from '../../stores/withApollo';

export const useGQLErrorHandler = (callback: (msg: string) => void) => {
	const gqlErrors = useReactiveVar(gqlErrorsVar);

	useEffect(() => {
		gqlErrorsVar([]);
	}, []);
	useEffect(() => {
		if (gqlErrors?.length > 0) {
			gqlErrors.forEach((msg) => callback(msg));
		}
	}, [gqlErrors]);
};
