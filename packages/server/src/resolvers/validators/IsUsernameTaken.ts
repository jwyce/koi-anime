import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

import { User } from '../../entities/User';

@ValidatorConstraint({ async: true })
export class IsUsernameTakenConstraint implements ValidatorConstraintInterface {
	validate(username: string) {
		console.log('MADE IT');
		return User.findOne({ where: { username } }).then((user) => {
			console.log(user);
			if (user) return false;
			return true;
		});
	}
}

export function IsUsernameTaken(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: IsUsernameTakenConstraint,
		});
	};
}
