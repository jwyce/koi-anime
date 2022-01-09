import Image from 'next/image';
import NextLink from 'next/link';
import React from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Button,
	Heading,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Stack,
	Text,
} from '@chakra-ui/react';

import logo from '../../assets/images/koi-icon.svg';

interface MobileHamburgerProps {
	username: string;
	isOpen: boolean;
	onClose: () => void;
}

export const MobileHamburger: React.FC<MobileHamburgerProps> = ({
	username,
	isOpen,
	onClose,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size="full">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader fontSize="3xl">
					<HStack>
						<Image src={logo} alt="logo" height="50em" width="50em" />
						<Heading>Koi Anime List</Heading>
					</HStack>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Stack spacing={3}>
						<NextLink href={`/users/${username}/library`}>
							<a>
								<Button w="100%">My Library</Button>
							</a>
						</NextLink>
						<Spacer mr={2} />
						<NextLink href="/vote/anime">
							<a>
								<Button w="100%">Vote</Button>
							</a>
						</NextLink>
						<Spacer mr={2} />
						<Menu>
							<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
								Browse
							</MenuButton>
							<MenuList>
								<MenuItem>
									<NextLink href="/browse/anime">
										<a style={{ width: '100%' }}>Anime</a>
									</NextLink>
								</MenuItem>
								<MenuItem>
									<NextLink href="/browse/manga">
										<a style={{ width: '100%' }}>Manga</a>
									</NextLink>
								</MenuItem>
							</MenuList>
						</Menu>
						<Spacer mr={2} />
						<NextLink href={`/top-rated/anime`}>
							<a>
								<Button w="100%">
									<Text fontWeight={100}>🏆</Text> Top Rated
								</Button>
							</a>
						</NextLink>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};
