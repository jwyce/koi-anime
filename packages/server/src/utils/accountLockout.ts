import dayjs from 'dayjs';

export const accountLockout = (attempts: number) => {
	if (attempts >= 5) {
		return {
			lockout: dayjs().add(100, 'y'),
			message: 'your account has been locked, please reset your password',
		};
	} else if (attempts >= 4) {
		return {
			lockout: dayjs().add(30, 'm'),
			message: 'your account has been locked for 30 minutes',
		};
	} else if (attempts >= 3) {
		return {
			lockout: dayjs().add(5, 'm'),
			message: 'your account has been locked for 5 minutes',
		};
	}
	return null;
};
