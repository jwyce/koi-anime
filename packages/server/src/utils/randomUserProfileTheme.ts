import { ProfileColor, ProfileIcon } from '../helpers/enums';
import * as _ from 'lodash';

export const randomUserProfileTheme = () => {
	const colors = Object.values(ProfileColor);
	const icons = Object.values(ProfileIcon);

	const profileColor = colors[_.random(0, colors.length)];
	const profileIcon = icons[_.random(0, icons.length)];

	return { profileColor, profileIcon };
};
