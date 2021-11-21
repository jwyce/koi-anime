import { FieldError } from '../resolvers/validators/FieldError';

export const validateSchema = async (schema: any, input: any) => {
	let errors: FieldError[] = [];

	try {
		await schema.validate(input, { abortEarly: false });
	} catch (err) {
		err.inner.forEach((e: any) => {
			errors.push({
				field: e.path,
				message: e.message,
			});
		});
	}
	if (errors.length === 0) return null;
	return errors;
};
