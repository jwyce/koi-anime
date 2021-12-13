import { Box, Button, Heading, Progress, Stack, useToast } from 'native-base';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AuthNavProps } from 'src/types/AuthParamList';

import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
	MeDocument,
	MeQuery,
	passwordStrength,
	registerSchema,
	useRegisterMutation,
	useToggle,
} from '@koi/controller';

import { InputField } from '../../components/form/InputField';
import { appBackgroundColor } from '../../utils/appBackgroundColor';
import { useGQLErrorHandler } from '../../utils/hooks/useGraphQLErrorHandler';
import { AuthContext } from '../../AuthProvider';

export const Register: React.FC<AuthNavProps<'Register'>> = ({}) => {
	const toast = useToast();
	const [register, { loading }] = useRegisterMutation();
	const [showPassword, toggleShowPassword] = useToggle(false);
	const { login: saveUser } = useContext(AuthContext);

	const {
		control,
		watch,
		handleSubmit,
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
		toast.show({
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
			console.log(response.data?.register.errors);
			toast.show({
				title: response.data?.register.errors[0].field,
				variant: 'left-accent',
				description: response.data?.register.errors[0].message,
				status: 'error',
				duration: 9000,
				isClosable: true,
			});
		} else if (response.data?.register.user) {
			console.log('saving user');
			// save in async storage
			saveUser(response.data.register.user);
			// navigate to
		}
	};

	return (
		<Box px={5} flex={1} background={appBackgroundColor()}>
			<KeyboardAwareScrollView extraScrollHeight={100}>
				<Heading fontSize="4xl">Register</Heading>
				<Stack space={5} mt={10}>
					<Controller
						name="username"
						control={control}
						render={({ field }) => (
							<InputField
								field={field}
								label="Username"
								error={errors.username}
							/>
						)}
					/>
					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<InputField
								field={field}
								label="Email"
								type="email"
								error={errors.email}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<InputField
								field={field}
								label="Password"
								type={showPassword ? 'text' : 'password'}
								error={errors.password}
								startAdornment={<Ionicons name="lock-closed" />}
								endAdornment={
									<Ionicons name={showPassword ? 'eye' : 'eye-off'} />
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
					<Controller
						name="confirmPassword"
						control={control}
						render={({ field }) => (
							<InputField
								field={field}
								label="Confirm password"
								type={showPassword ? 'text' : 'password'}
								error={errors.confirmPassword}
								startAdornment={<Ionicons name="lock-closed" />}
							/>
						)}
					/>
					<Button
						colorScheme="teal"
						h={12}
						_text={{ fontSize: 'lg' }}
						onPress={handleSubmit(onSubmit)}
						isLoading={loading}
					>
						Sign up
					</Button>
				</Stack>
			</KeyboardAwareScrollView>
		</Box>
	);
};
