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
	Progress,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
	registerSchema,
	useRegisterMutation,
	useToggle,
} from '@koi/controller';

import logo from '../assets/images/koi-icon.svg';
import { Layout } from '../components/Layout';
import { Surface } from '../components/styles/Surface';
import { withApollo } from '../stores/withApollo';
import { useGQLErrorHandler } from '../utils/hooks/useGQLErrorHandler';
import { passwordStrength } from '../utils/passwordStrength';

export const Register: React.FC<{}> = ({}) => {
	const router = useRouter();
	const toast = useToast();
	const [register] = useRegisterMutation();
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
		console.log(data);
		const response = await register({ variables: { options: data } });
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
								<Input {...field} placeholder="Username" label="Username" />
							)}
						/>
						{errors.username && (
							<Text color="red.500">{errors.username?.message}</Text>
						)}
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
						{errors.email && (
							<Text color="red.500">{errors.email?.message}</Text>
						)}
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
						<Progress
							value={passwordStrength(watch('password')).strength}
							colorScheme={passwordStrength(watch('password')).color}
							size="xs"
						/>
						{errors.password && (
							<Text color="red.500">{errors.password?.message}</Text>
						)}
						<Controller
							name="confirmPassword"
							control={control}
							render={({ field }) => (
								<Input
									{...field}
									placeholder="Confirm password"
									label="Confirm password"
									type={showPassword ? 'text' : 'password'}
								/>
							)}
						/>
						{errors.confirmPassword && (
							<Text color="red.500">{errors.confirmPassword?.message}</Text>
						)}
						<Button type="submit" colorScheme="teal">
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
