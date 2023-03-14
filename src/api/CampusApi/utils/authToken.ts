import Cookies from 'js-cookie';

export const AUTH_TOKEN_KEY = 'token';

export const getAuthTokenFromCookies = () => Cookies.get(AUTH_TOKEN_KEY);
export const setAuthTokenToCookies = (token: string) =>
  Cookies.set(AUTH_TOKEN_KEY, token);
export const deleteAuthTokenFromCookies = () => Cookies.remove(AUTH_TOKEN_KEY);
