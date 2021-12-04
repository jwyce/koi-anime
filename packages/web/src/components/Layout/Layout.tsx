import React from 'react';

import { Navbar } from './Navbar';
import { Wrapper, WrapperVariant } from './Wrapper';

interface LayoutProps {
	variant?: WrapperVariant;
	noMargin?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
	children,
	variant,
	noMargin,
}) => {
	return (
		<>
			<Navbar />
			<Wrapper variant={variant} noMargin={noMargin}>
				{children}
			</Wrapper>
		</>
	);
};
