// import { useRouter } from 'next/router';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

import {
	Box,
	Grid,
	Heading,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
} from '@chakra-ui/react';
import { useSearchMangaQuery } from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { isServer } from '../../utils/isServer';

import type { NextPage } from 'next';
export const BrowseManga: NextPage = ({}) => {
	// const router = useRouter();
	const { data, loading } = useSearchMangaQuery({
		variables: {
			cursor: 0,
			limit: 20,
		},
		skip: isServer(),
	});

	if (loading) {
		<Layout>
			<Loader size="xl" />
		</Layout>;
	}

	return (
		<Layout variant="full">
			<Stack alignItems="center">
				<Box w={1000}>
					<Box textAlign="left" w="100%">
						<Heading pb={1}>Explore Manga</Heading>
						<InputGroup pb={6}>
							<InputLeftElement
								pointerEvents="none"
								color="gray.300"
								fontSize="1.5em"
								top={1}
								left={1}
								children={<IoSearch color="gray.300" />}
							/>
							<Input placeholder="What are you looking for?" size="lg" />
						</InputGroup>
					</Box>
					{!data ? (
						<Loader size="xl" />
					) : (
						<Grid templateColumns="repeat(5, 1fr)" gap={3}>
							{data?.kitsuSearchManga.items.map((x) => (
								<Image
									key={x.id}
									src={x.posterLinkSmall}
									alt={x.canonicalTitle}
									w={200}
									borderRadius={6}
								/>
								// <Box key={idx}>{x.canonicalTitle}</Box>
							))}
						</Grid>
					)}
				</Box>
			</Stack>
		</Layout>
	);
};

export default withApollo({ ssr: false })(BrowseManga);
