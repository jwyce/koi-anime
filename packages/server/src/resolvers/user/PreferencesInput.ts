import { Field, InputType } from 'type-graphql';

import {
	ProfileColor,
	ProfileIcon,
	TitlePreference,
} from '../../helpers/enums';
import { IsEmailAlreadyExist } from '../validators/IsEmailAlreadyExist';
import { IsUsernameTaken } from '../validators/IsUsernameTaken';

@InputType()
export class PreferencesInput {
	@Field({ nullable: true })
	@IsUsernameTaken({ message: 'username already taken' })
	username?: string;

	@Field({ nullable: true })
	@IsEmailAlreadyExist({ message: 'email already in use' })
	email?: string;

	@Field(() => TitlePreference)
	titlePreference: TitlePreference;

	@Field(() => ProfileColor)
	profileColor: ProfileColor;

	@Field(() => ProfileIcon)
	profileIcon: ProfileIcon;

	@Field()
	showNSFW: boolean;
}
