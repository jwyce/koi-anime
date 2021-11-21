import { useLayoutEffect, useRef, useState } from 'react';

export const useMeasure = (
	deps: any[]
): [DOMRect | null, React.MutableRefObject<HTMLElement | null>] => {
	const [rect, setRect] = useState<DOMRect | null>(null);
	const domRef = useRef<HTMLElement | null>(null);

	useLayoutEffect(() => {
		if (domRef.current) {
			setRect(domRef.current.getBoundingClientRect());
		}
	}, [deps]);

	return [rect, domRef];
};
