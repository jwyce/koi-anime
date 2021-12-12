import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import {
	Button,
	Heading,
	HStack,
	Progress,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
	resetPasswordSchema,
	useResetPasswordMutation,
	useToggle,
} from '@koi/controller';

import logo from '../../assets/images/koi-icon.svg';
import { FormError } from '../../components/Form/FormError';
import { InputField } from '../../components/Form/InputField';
import { Layout } from '../../components/Layout/Layout';
import { Surface } from '../../components/UI/Surface';
import { withApollo } from '../../stores/withApollo';
import { passwordStrength } from '../../utils/passwordStrength';

export const ResetPassword: NextPage = ({}) => {
	const router = useRouter();
	const toast = useToast();
	const [resetPassword] = useResetPasswordMutation();
	const [showPassword, toggleShowPassword] = useToggle(false);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
		resolver: yupResolver(resetPasswordSchema as any),
	});

	const onSubmit = async (data: any) => {
		const response = await resetPassword({
			variables: {
				token: typeof router.query.token === 'string' ? router.query.token : '',
				...data,
			},
		});

		console.log('response', response);
		if (response.data?.resetPassword.errors) {
			toast({
				title: response.data?.resetPassword.errors[0].field,
				variant: 'left-accent',
				description: response.data?.resetPassword.errors[0].message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'Password Reset',
				variant: 'left-accent',
				description:
					'Password successfully reset, please login with your new password',
				status: 'success',
				duration: 9000,
				isClosable: true,
			});
			router.push('/login');
		}
	};

	return (
		<Layout variant="small">
			<NextSeo
				title="Reset Password - Koi Anime"
				description="A short description goes here."
			/>
			<Surface>
				<HStack spacing="5px" justify="center" pb={2}>
					<Image src={logo} alt="logo" height="75px" width="75px" />
					<Heading as="h2">Password Reset</Heading>
				</HStack>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={['column']} spacing=".8em">
						<Controller
							name="newPassword"
							control={control}
							render={({ field }) => (
								<InputField
									field={field}
									label="New Password"
									size="md"
									type={showPassword ? 'text' : 'password'}
									errorField={errors.newPassword}
									endAdornment={
										showPassword ? (
											<AiFillEye size={24} />
										) : (
											<AiFillEyeInvisible size={24} />
										)
									}
									actionCallback={toggleShowPassword}
								/>
							)}
						/>
						<Progress
							value={passwordStrength(watch('newPassword')).strength}
							colorScheme={passwordStrength(watch('newPassword')).color}
							size="xs"
						/>
						<FormError field={errors.newPassword} />
						<Controller
							name="confirmPassword"
							control={control}
							render={({ field }) => (
								<InputField
									field={field}
									label="Confirm password"
									type={showPassword ? 'text' : 'password'}
									errorField={errors.confirmPassword}
								/>
							)}
						/>
						<FormError field={errors.confirmPassword} />
						<Button type="submit" colorScheme="teal">
							Reset Password
						</Button>
					</Stack>
				</form>
			</Surface>
		</Layout>
	);
};

export default withApollo({ ssr: false })(ResetPassword);
