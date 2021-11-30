import { Box, useStyleConfig } from '@chakra-ui/react';
import React from 'react';

interface SurfaceProps {}

export const Surface: React.FC<SurfaceProps> = ({ children }) => {
	const styles = useStyleConfig('Surface');
	return <Box sx={styles}>{children}</Box>;
};
