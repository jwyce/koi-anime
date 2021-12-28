import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Box,
	InputGroup,
	InputLeftElement,
	Input,
	HStack,
	FormLabel,
	Select,
	IconButton,
} from '@chakra-ui/react';
import { SortBy } from '@koi/controller';
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
	username: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ username }) => {
	const [searchStr, setSearchStr] = useState('');
	const sortByListMap = Object.values(SortBy).map((value) => ({
		text: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
		value: value.toLowerCase(),
	}));
	return (
		<>
			<Box textAlign="left" w="100%" pt={5}>
				<InputGroup>
					<InputLeftElement
						pointerEvents="none"
						color="gray.300"
						fontSize="1.5em"
						top={1}
						left={1}
						children={<IoSearch color="gray.300" />}
					/>
					<Input
						placeholder={`Search ${username}'s Library...`}
						size="lg"
						focusBorderColor="teal.400"
						value={searchStr}
						onChange={(e) => setSearchStr(e.target.value)}
					/>
				</InputGroup>
			</Box>
			<HStack pt={2} justify="space-between">
				<Box display="flex" alignItems="center" w="44">
					<FormLabel
						htmlFor="titlePreference"
						mb="0"
						whiteSpace="nowrap"
						fontSize="md"
					>
						Sort by:
					</FormLabel>

					<Select size="sm">
						{sortByListMap.map((x, idx) => (
							<option key={idx} value={x.value}>
								{x.text}
							</option>
						))}
					</Select>
				</Box>
				<IconButton
					aria-label="direction"
					colorScheme="teal"
					size="sm"
					isRound
					icon={<ChevronDownIcon fontSize="2xl" />}
				/>
			</HStack>
		</>
	);
};
