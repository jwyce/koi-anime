import * as yup from 'yup';

export const registerSchema = yup.object().shape({
	username: yup
		.string()
		.min(3, 'Username must be at least 3 characters')
		.max(20, 'Username cannot be more than 20 characters')
		.matches(
			/^[a-z0-9_]+$/,
			'Username may only contain letters, numbers, and underscores'
		)
		.required('Username is required'),
	email: yup.string().email().required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'Password too weak'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], "Passwords don't match")
		.required('Please confirm your password'),
});

export const resetPasswordSchema = yup.object().shape({
	password: yup.string().required('Old password is required'),
	newPassword: yup
		.string()
		.required('New password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'Password too weak'
		),
	confirmPassword: yup
		.string()
		.notOneOf(
			[yup.ref('password')],
			'New password cannot be your previous password'
		)
		.oneOf([yup.ref('newPassword')], "Passwords don't match")
		.required('Please confirm your password'),
});

export const forgotPasswordSchema = yup.object().shape({
	token: yup.string().required(),
	newPassword: yup
		.string()
		.required('Password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
			'Password too weak'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], "Passwords don't match")
		.required('Please confirm your password'),
});
