export const __prod__ = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = 'jid';

export const FORGET_PASSWORD_PREFIX = 'forget-password:';
export const CONFIRM_USER_PREFIX = 'confirm-user:';
export const RATE_LIMIT_PREFIX = 'rate-limit:';

const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_YEAR = ONE_DAY * 365;
