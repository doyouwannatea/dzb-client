import AuthApi from './AuthApi';
import AuthApiMock from './AuthApiMock';

export const authApi =
  process.env.VITE_MOCK_API === 'true' ? new AuthApiMock() : new AuthApi();
