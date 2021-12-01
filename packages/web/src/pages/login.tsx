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
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Link,
	Stack,
	useToast,
} from '@chakra-ui/react';
import {
	useLoginMutation,
	useToggle,
	MeDocument,
	MeQuery,
} from '@koi/controller';

import logo from '../assets/images/koi-icon.svg';
import { Layout } from '../components/Layout';
import { Surface } from '../components/styles/Surface';
import { withApollo } from '../stores/withApollo';
import { useGQLErrorHandler } from '../utils/hooks/useGQLErrorHandler';

export const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const toast = useToast();
	const [login] = useLoginMutation();
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
								<Input
									{...field}
									placeholder="Username or email"
									label="Username or Email"
								/>
							)}
						/>
						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<InputGroup size="md">
									<Input
										{...field}
										placeholder="Password"
										label="Password"
										pr="4.5rem"
										type={showPassword ? 'text' : 'password'}
									/>
									<InputRightElement width="3rem">
										<IconButton
											h="3rem"
											size="lg"
											aria-label="show password"
											variant="ghost"
											isRound
											onClick={toggleShowPassword}
											icon={
												showPassword ? (
													<AiFillEyeInvisible size={24} />
												) : (
													<AiFillEye size={24} />
												)
											}
										/>
									</InputRightElement>
								</InputGroup>
							)}
						/>
						<Button type="submit" colorScheme="teal">
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
