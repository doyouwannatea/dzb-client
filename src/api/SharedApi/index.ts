import SharedApi from './SharedApi';
import SharedApiMock from './SharedApiMock';

export const sharedApi =
  process.env.VITE_MOCK_API === 'true' ? new SharedApiMock() : new SharedApi();
