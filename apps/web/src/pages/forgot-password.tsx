import { NextSeo } from 'next-seo';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
	Button,
	Heading,
	HStack,
	Input,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { useForgotPasswordMutation } from '@koi/controller';

import logo from '../assets/images/koi-icon.svg';
import { Layout } from '../components/Layout/Layout';
import { Surface } from '../components/UI/Surface';
import { withApollo } from '../stores/withApollo';

import { NextPage } from 'next';
export const ForgotPassword: NextPage = ({}) => {
	const router = useRouter();
	const toast = useToast();
	const [sendReset] = useForgotPasswordMutation();

	const { control, handleSubmit } = useForm({
		defaultValues: {
			email: '',
		},
	});

	const onSubmit = async (data: any) => {
		const response = await sendReset({ variables: data });
		if (response.data) {
			toast({
				title: 'Password Reset Sent',
				variant: 'left-accent',
				description:
					'if an account with that email exists, we sent you a reset link',
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
				title="Forgot Password - Koi Anime"
				description="A short description goes here."
			/>
			<Surface>
				<HStack spacing="5px" justify="center" pb={2}>
					<Image src={logo} alt="logo" height="75px" width="75px" />
					<Heading as="h6" fontSize="2em">
						Forgot Password
					</Heading>
				</HStack>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack direction={['column']} spacing=".8em">
						<Controller
							name="email"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder="Email"
									label="Email"
									type="email"
								/>
							)}
						/>
						<Button type="submit" colorScheme="teal">
							Reset password
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

export default withApollo({ ssr: false })(ForgotPassword);
