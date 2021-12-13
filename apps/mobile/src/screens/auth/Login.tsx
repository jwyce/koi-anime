import {
	Box,
	Button,
	Heading,
	KeyboardAvoidingView,
	ScrollView,
	Stack,
	useColorModeValue,
} from 'native-base';
import React, { useMemo, useRef } from 'react';
import { AuthNavProps } from 'src/types/AuthParamList';

import { appBackgroundColor } from '../../utils/appBackgroundColor';
import { useLoginMutation, useToggle } from '@koi/controller';
import { Controller, useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetHandle } from '@gorhom/bottom-sheet';
import { InputField } from '../../components/form/InputField';

export const Login: React.FC<AuthNavProps<'Login'>> = ({}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['99%'], []);
	const [login, { loading }] = useLoginMutation();
	const [showPassword, toggleShowPassword] = useToggle(false);

	const { control, handleSubmit } = useForm({
		defaultValues: {
			usernameOrEmail: '',
			password: '',
		},
	});
	const onSubmit = (data: any) => console.log(data);

	return (
		<Box px={5} minH="100%" background={appBackgroundColor()}>
			<ScrollView>
				<KeyboardAvoidingView>
					<Heading fontSize="4xl">Log in</Heading>
					<Stack space={5} mt={10}>
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
									type={showPassword ? 'text' : 'password'}
									startAdornment={<Ionicons name="lock-closed" />}
									endAdornment={
										<Ionicons name={showPassword ? 'eye' : 'eye-off'} />
									}
									actionCallback={toggleShowPassword}
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
							Sign in
						</Button>
						<Button
							colorScheme="teal"
							variant="outline"
							onPress={() => bottomSheetRef.current?.expand()}
						>
							Forgot password?
						</Button>
					</Stack>
				</KeyboardAvoidingView>
			</ScrollView>
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				enablePanDownToClose
				snapPoints={snapPoints}
				backgroundStyle={{
					backgroundColor: useColorModeValue('#d6d3d1', '#44403c'),
				}}
				handleComponent={(props) => (
					<BottomSheetHandle
						{...props}
						indicatorStyle={{
							backgroundColor: useColorModeValue('#44403c', '#d6d3d1'),
						}}
					/>
				)}
			>
				<Box p={5}>
					<Heading>Awesome 🎉</Heading>
				</Box>
			</BottomSheet>
		</Box>
	);
};
