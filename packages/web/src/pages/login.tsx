import React from 'react';

import { withApollo } from '../utils/withApollo';

export const Login: React.FC<{}> = ({}) => {
	return <div>login screen</div>;
};

export default withApollo({ ssr: false })(Login);
