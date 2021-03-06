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
	Link,
	Stack,
	useToast,
} from '@chakra-ui/react';
import {
	MeDocument,
	MeQuery,
	useLoginMutation,
	useToggle,
} from '@koi/controller';

import logo from '../assets/images/koi-icon.svg';
import { InputField } from '../components/Form/InputField';
import { Layout } from '../components/Layout/Layout';
import { Surface } from '../components/UI/Surface';
import { withApollo } from '../stores/withApollo';
import { useAlreadyAuth } from '../utils/hooks/useAlreadyAuth';
import { useGQLErrorHandler } from '../utils/hooks/useGQLErrorHandler';

export const Login: NextPage = ({}) => {
	useAlreadyAuth();
	const router = useRouter();
	const toast = useToast();
	const [login, { loading }] = useLoginMutation();
	const [showPassword, toggleShowPassword] = useToggle(false);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			usernameOrEmail: '',
			password: '',
		},
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
		const response = await login({
			variables: data,
			update: (store, { data }) => {
				if (!data) {
					return;
				}
				store.writeQuery<MeQuery>({
					query: MeDocument,
					data: {
						me: data.login.user,
					},
				});
			},
		});
		if (response.data?.login.errors) {
			toast({
				title: response.data?.login.errors[0].field,
				variant: 'left-accent',
				description: response.data?.login.errors[0].message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else if (response.data?.login.user) {
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
				title="Login - Koi Anime"
				description="A short description goes here."
			/>
			<Surface>
				<HStack spacing="5px" justify="center" pb={2}>
					<Image src={logo} alt="logo" height="75px" width="75px" />
					<Heading as="h2">Log In</Heading>
				</HStack>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={['column']} spacing=".8em">
						<Controller
							name="usernameOrEmail"
							control={control}
							render={({ field }) => (
								<InputField field={field} label="Username or email" />
							)}
						/>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<InputField
									field={field}
									label="Password"
									size="md"
									type={showPassword ? 'text' : 'password'}
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
						<Button type="submit" colorScheme="teal" isLoading={loading}>
							Sign in
						</Button>
						<NextLink href="/register">
							<Button colorScheme="teal" variant="outline" size="sm">
								Create account?
							</Button>
						</NextLink>
						<NextLink href="/forgot-password">
							<Link
								color="teal.500"
								textDecorationStyle="dashed"
								textAlign="center"
								fontSize="smaller"
							>
								Forgot password?
							</Link>
						</NextLink>
					</Stack>
				</form>
			</Surface>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Login);
