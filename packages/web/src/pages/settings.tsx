import { NextSeo } from 'next-seo';
import React from 'react';
import { GiCirclingFish } from 'react-icons/gi';

import { Avatar, Heading, HStack, Spacer, useToast } from '@chakra-ui/react';
import { useMeQuery } from '@koi/controller';

import { ChangePassword } from '../components/Account/ChangePassword';
import { DeleteAccount } from '../components/Account/DeleteAccount';
import { Preferences } from '../components/Account/Preferences';
import { Layout } from '../components/Layout';
import { Loader } from '../components/styles/Loader';
import { withApollo } from '../stores/withApollo';
import { isServer } from '../utils/isServer';

export const Settings: React.FC<{}> = ({}) => {
	const { data, loading } = useMeQuery({ skip: isServer() });
	const toast = useToast();

	if (loading || !data)
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
					icon={<GiCirclingFish fontSize="3.5rem" />}
					size="xl"
					bg="primary.medium"
					color="white"
				/>
				<Heading as="h2" fontSize="3xl">
					{data.me?.username}'s Preferences
				</Heading>
			</HStack>

			<Spacer mt={10} />
			<Preferences me={data.me} />

			<Spacer mt={10} />
			<ChangePassword
				sendConfirmationCallback={() => {
					toast({
						title: 'Confirmation Sent',
						variant: 'left-accent',
						description: 'please check your email for a confirmation link',
						status: 'success',
						position: 'bottom-right',
						duration: 9000,
						isClosable: true,
					});
				}}
			/>

			<Spacer mt={10} />
			<DeleteAccount />
		</Layout>
	);
};

export default withApollo({ ssr: false })(Settings);
