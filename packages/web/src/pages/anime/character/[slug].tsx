import React from 'react';

import { withApollo } from '../../../stores/withApollo';

import type { NextPage } from 'next';
export const CharacterDetail: NextPage = ({}) => {
	return <div>hi</div>;
};

export default withApollo({ ssr: false })(CharacterDetail);
