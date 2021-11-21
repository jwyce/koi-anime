import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from '../validators/IsEmailAlreadyExist';
import { IsUsernameTaken } from '../validators/IsUsernameTaken';

@InputType()
export class RegisterInput {
	@Field()
	@IsUsernameTaken({ message: 'username already taken' })
	username: string;

	@Field()
	@IsEmailAlreadyExist({ message: 'email already in use' })
	email: string;

	@Field()
	password: string;

	@Field()
	confirmPassword: string;
}
