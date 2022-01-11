import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useConfirmEmailMutation, MeDocument, MeQuery } from '@koi/controller';

import { Layout } from '../../components/Layout/Layout';
import { Loader } from '../../components/UI/Loader';
import { withApollo } from '../../stores/withApollo';
import { useToast } from '@chakra-ui/toast';
import { gql } from '@apollo/client';

export const ConfirmEmail: NextPage = ({}) => {
	const router = useRouter();
	const toast = useToast();
	const [confirm, { loading }] = useConfirmEmailMutation();

	useEffect(() => {
		const confirmEmail = async () => {
			const res = await confirm({
				variables: {
					token:
						typeof router.query.token === 'string' ? router.query.token : '',
				},
				update: (cache) => {
					const data = cache.readQuery<MeQuery>({
						query: MeDocument,
					});
					if (data) {
						cache.writeFragment({
							id: `User:${data.me?.id}`,
							fragment: gql`
								fragment __ on User {
									isConfirmed
								}
							`,
							data: { isConfirmed: true },
						});
					}
				},
			});

			if (!loading && res.data && res.data.confirmEmail === false) {
				toast({
					title: 'Error',
					variant: 'left-accent',
					description: 'token expired',
					status: 'error',
					position: 'bottom-right',
					duration: 9000,
					isClosable: true,
				});
			}
		};
		router.replace('/settings');

		if (router.query.token?.length ?? -1 > 0) {
			confirmEmail();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query]);

	return (
		<Layout>
			<Loader size="xl" />
		</Layout>
	);
};

export default withApollo({ ssr: false })(ConfirmEmail);
