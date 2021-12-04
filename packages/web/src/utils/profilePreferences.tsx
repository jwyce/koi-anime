import { ProfileColor, ProfileIcon } from '@koi/controller';
import {
	GiCirclingFish,
	GiSeaDragon,
	GiSittingDog,
	GiFrog,
	GiSandSnake,
	GiFox,
	GiRabbit,
	GiCat,
	GiMonkey,
	GiSeahorse,
	GiTigerHead,
	GiGoat,
	GiRooster,
	GiPig,
	GiRat,
	GiTurtle,
} from 'react-icons/gi';

export const profileColor = (color: string) => {
	switch (color.toUpperCase()) {
		case ProfileColor.Blue:
			return '#869EFF';
		case ProfileColor.Pink:
			return '#EB79FA';
		case ProfileColor.Teal:
			return '#00C7B4';
		case ProfileColor.Redorange:
			return '#ff6250';
		case ProfileColor.Salmon:
			return '#FF8691';
		case ProfileColor.Purple:
			return '#555B8C';
	}
	return null;
};

// TODO: find / create custom icons?
export const profileIcon = (icon: string, size: number) => {
	switch (icon.toUpperCase()) {
		case ProfileIcon.Koi:
			return <GiCirclingFish fontSize={size} />;
		case ProfileIcon.Dragon:
			return <GiSeaDragon fontSize={size} />;
		case ProfileIcon.Dog:
			return <GiSittingDog fontSize={size} />;
		case ProfileIcon.Frog:
			return <GiFrog fontSize={size} />;
		case ProfileIcon.Snake:
			return <GiSandSnake fontSize={size} />;
		case ProfileIcon.Fox:
			return <GiFox fontSize={size} />;
		case ProfileIcon.Rabbit:
			return <GiRabbit fontSize={size} />;
		case ProfileIcon.Cat:
			return <GiCat fontSize={size} />;
		case ProfileIcon.Monkey:
			return <GiMonkey fontSize={size} />;
		case ProfileIcon.Seahorse:
			return <GiSeahorse fontSize={size} />;
		case ProfileIcon.Tiger:
			return <GiTigerHead fontSize={size} />;
		case ProfileIcon.Goat:
			return <GiGoat fontSize={size} />;
		case ProfileIcon.Rooster:
			return <GiRooster fontSize={size} />;
		case ProfileIcon.Pig:
			return <GiPig fontSize={size} />;
		case ProfileIcon.Rat:
			return <GiRat fontSize={size} />;
		case ProfileIcon.Turtle:
			return <GiTurtle fontSize={size} />;
	}
	return null;
};
