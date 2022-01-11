import { NextSeo } from 'next-seo';
import React from 'react';

import { Avatar, Heading, HStack, Spacer, useToast } from '@chakra-ui/react';
import { useMeQuery, useSendConfirmationMutation } from '@koi/controller';

import { ChangePassword } from '../components/Account/ChangePassword';
import { DeleteAccount } from '../components/Account/DeleteAccount';
import { Preferences } from '../components/Account/Preferences';
import { Layout } from '../components/Layout/Layout';
import { Loader } from '../components/UI/Loader';
import { withApollo } from '../stores/withApollo';
import { isServer } from '../utils/isServer';
import { profileColor, profileIcon } from '../utils/profilePreferences';

import { NextPage } from 'next';
import { useIsAuth } from '../utils/hooks/useIsAuth';
export const Settings: NextPage = ({}) => {
	useIsAuth();

	const { data, loading } = useMeQuery({ skip: isServer() });
	const [sendConfirmation] = useSendConfirmationMutation();
	const toast = useToast();

	if (loading || !data || !data.me)
		return (
			<Layout>
				<Loader size="xl" />
			</Layout>
		);

	return (
		<Layout>
			<NextSeo
				title="Settings - Koi Anime"
				description="A short description goes here."
			/>
			<HStack spacing={10}>
				<Avatar
					icon={profileIcon(data.me!.profileIcon, '3.5rem')!}
					size="xl"
					bg={profileColor(data.me!.profileColor)!}
					color="white"
				/>
				<Heading as="h2" fontSize="3xl">
					{data.me?.username}&apos;s Preferences
				</Heading>
			</HStack>

			<Spacer mt={10} />
			<Preferences me={data.me!} />

			<Spacer mt={10} />
			<ChangePassword
				me={data.me!}
				sendConfirmationCallback={async () => {
					toast({
						title: 'Confirmation Sent',
						variant: 'left-accent',
						description: 'please check your email for a confirmation link',
						status: 'success',
						position: 'bottom-right',
						duration: 9000,
						isClosable: true,
					});
					await sendConfirmation({ variables: { email: data.me!.email } });
				}}
			/>

			<Spacer mt={10} />
			<DeleteAccount />
		</Layout>
	);
};

export default withApollo({ ssr: false })(Settings);
