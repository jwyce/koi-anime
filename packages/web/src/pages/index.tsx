import { Button } from '@chakra-ui/button';
import { useColorMode } from '@chakra-ui/color-mode';
import type { NextPage } from 'next';

const Home: NextPage = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<div>
			<div>hello world</div>
			<Button colorScheme="orange" onClick={toggleColorMode}>
				{colorMode === 'light' ? 'Dark' : 'Light'}
			</Button>
		</div>
	);
};

export default Home;
