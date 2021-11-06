import { MyContext } from 'src/typings/MyContext';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
	if (!context.req.session.userId) {
		throw new Error('not authenticated');
	}
	return next();
};
