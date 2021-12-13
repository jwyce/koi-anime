import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import NextLink from 'next/link';
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
	MeDocument,
	MeQuery,
	passwordStrength,
	registerSchema,
	useRegisterMutation,
	useToggle,
} from '@koi/controller';

import logo from '../assets/images/koi-icon.svg';
import { FormError } from '../components/Form/FormError';
import { InputField } from '../components/Form/InputField';
import { Layout } from '../components/Layout/Layout';
import { Surface } from '../components/UI/Surface';
import { withApollo } from '../stores/withApollo';
import { useAlreadyAuth } from '../utils/hooks/useAlreadyAuth';
import { useGQLErrorHandler } from '../utils/hooks/useGQLErrorHandler';

export const Register: NextPage = ({}) => {
	useAlreadyAuth();
	const router = useRouter();
	const toast = useToast();
	const [register, { loading }] = useRegisterMutation();
	const [showPassword, toggleShowPassword] = useToggle(false);

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(registerSchema as any),
	});

	useGQLErrorHandler((msg) => {
		toast({
			title: 'Error',
			variant: 'left-accent',
			description: msg,
			status: 'error',
			duration: 9000,
			isClosable: true,
		});
	});

	const onSubmit = async (data: any) => {
		const response = await register({
			variables: { options: data },
			update: (store, { data }) => {
				if (!data) {
					return;
				}
				store.writeQuery<MeQuery>({
					query: MeDocument,
					data: {
						me: data.register.user,
					},
				});
			},
		});
		if (response.data?.register.errors) {
			toast({
				title: response.data?.register.errors[0].field,
				variant: 'left-accent',
				description: response.data?.register.errors[0].message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else if (response.data?.register.user) {
			if (typeof router.query.next === 'string') {
				router.push(router.query.next);
			} else {
				router.push('/');
			}
		}
	};

	return (
		<Layout variant="small">
			<NextSeo
				title="Register - Koi Anime"
				description="A short description goes here."
			/>
			<Surface>
				<HStack spacing="5px" justify="center" pb={2}>
					<Image src={logo} alt="logo" height="75px" width="75px" />
					<Heading as="h2">Register</Heading>
				</HStack>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={['column']} spacing=".8em">
						<Controller
							name="username"
							control={control}
							render={({ field }) => (
								<InputField
									field={field}
									label="Username"
									errorField={errors.username}
								/>
							)}
						/>
						<FormError field={errors.username} />
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<InputField
									field={field}
									label="Email"
									errorField={errors.email}
									type="email"
								/>
							)}
						/>
						<FormError field={errors.email} />
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<InputField
									field={field}
									label="Password"
									size="md"
									type={showPassword ? 'text' : 'password'}
									errorField={errors.password}
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
							value={passwordStrength(watch('password')).strength}
							colorScheme={passwordStrength(watch('password')).color}
							size="xs"
						/>
						<FormError field={errors.password} />
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
						<Button type="submit" colorScheme="teal" isLoading={loading}>
							Create account
						</Button>
						<NextLink href="/login">
							<Button colorScheme="teal" variant="outline" size="sm">
								Sign in?
							</Button>
						</NextLink>
					</Stack>
				</form>
			</Surface>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Register);
