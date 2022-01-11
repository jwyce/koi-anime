import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
	Box,
	FormLabel,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
} from '@chakra-ui/react';
import { Direction, SortBy, useDebounce } from '@koi/controller';

import { shallowRouteInput } from './UserLibrary';

interface SearchBarProps {
	username: string;
	title: string;
	sort: SortBy;
	direction: Direction;
	filterCallback: (options: shallowRouteInput) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	username,
	title,
	sort,
	direction,
	filterCallback,
}) => {
	const [searchStr, setSearchStr] = useState(title);
	const sortByListMap = Object.values(SortBy).map((value) => ({
		text: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
		value: value.toUpperCase(),
	}));

	useDebounce(
		() => {
			filterCallback({ title: searchStr });
		},
		500,
		[searchStr]
	);

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
					>
						<IoSearch color="gray.300" />
					</InputLeftElement>
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

					<Select
						size="sm"
						defaultValue={sort}
						onChange={(e) => filterCallback({ sort: e.target.value as SortBy })}
					>
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
					icon={
						direction === Direction.Asc ? (
							<ChevronUpIcon fontSize="2xl" />
						) : (
							<ChevronDownIcon fontSize="2xl" />
						)
					}
					onClick={() =>
						filterCallback({
							direction:
								direction === Direction.Asc ? Direction.Desc : Direction.Asc,
						})
					}
				/>
			</HStack>
		</>
	);
};
