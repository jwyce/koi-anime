import { useRef, useEffect } from 'react';

export const useWhyDidYouUpdate = (name: string, props: any) => {
	const previousProps = useRef<any>();
	useEffect(() => {
		if (previousProps.current) {
			// Get all keys from previous and current props
			const allKeys = Object.keys({ ...previousProps.current, ...props });
			// Use this object to keep track of changed props
			const changesObj: any = {};
			// Iterate through keys
			allKeys.forEach((key) => {
				// If previous is different from current
				if (previousProps.current[key] !== props[key]) {
					// Add to changesObj
					changesObj[key] = {
						from: previousProps.current[key],
						to: props[key],
					};
				}
			});
			// If changesObj not empty then output to console
			if (Object.keys(changesObj).length) {
				console.log('[why-did-you-update]', name, changesObj);
			}
		}
		// Finally update previousProps with current props for next hook call
		previousProps.current = props;
	});
};
