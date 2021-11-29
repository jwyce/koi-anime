import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button, Heading, Input, useToast } from '@chakra-ui/react';
import { useLoginMutation } from '@koi/controller';

import { Layout } from '../components/Layout';
import { withApollo } from '../stores/withApollo';

export const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [login] = useLoginMutation();
	const toast = useToast();
	const { control, handleSubmit } = useForm({
		defaultValues: {
			usernameOrEmail: '',
			password: '',
		},
	});
	const onSubmit = async (data: any) => {
		const response = await login({ variables: data });
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
			<Heading as="h2">Login</Heading>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="usernameOrEmail"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="username or email"
							label="Username or Email"
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="password"
							label="Password"
							type="password"
						/>
					)}
				/>
				<Button type="submit">sign in</Button>
			</form>
		</Layout>
	);
};

export default withApollo({ ssr: false })(Login);
