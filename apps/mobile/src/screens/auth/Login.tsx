import {
	Box,
	Button,
	Heading,
	Icon,
	Input,
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
import { TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetHandle } from '@gorhom/bottom-sheet';

export const Login: React.FC<AuthNavProps<'Login'>> = ({}) => {
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ['99%'], []);
	const [login] = useLoginMutation();
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
				<Heading fontSize="4xl">Log in</Heading>
				<Stack space={5} mt={10}>
					<Controller
						name="usernameOrEmail"
						control={control}
						render={({ field }) => (
							<Input
								autoCapitalize="none"
								placeholder="Username or Email"
								onChangeText={field.onChange}
								size="2xl"
								p={3}
							/>
						)}
					/>
					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<Input
								autoCapitalize="none"
								placeholder="Password"
								onChangeText={field.onChange}
								size="2xl"
								type={showPassword ? 'text' : 'password'}
								p={3}
								InputLeftElement={
									<Icon
										as={<Ionicons name="lock-closed" />}
										size={5}
										ml="2"
										color="muted.400"
									/>
								}
								InputRightElement={
									<TouchableOpacity onPress={toggleShowPassword}>
										<Icon
											as={<Ionicons name={showPassword ? 'eye' : 'eye-off'} />}
											size={6}
											mr="2"
											color="muted.400"
										/>
									</TouchableOpacity>
								}
							/>
						)}
					/>
					<Button
						colorScheme="teal"
						h={12}
						_text={{ fontSize: 'lg' }}
						onPress={handleSubmit(onSubmit)}
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
