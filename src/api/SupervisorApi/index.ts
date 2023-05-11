import SupervisorApi from './SupervisorApi';
import SupervisorApiMock from './SupervisorApiMock';

export const supervisorApi =
  process.env.VITE_MOCK_API === 'true'
    ? new SupervisorApiMock()
    : new SupervisorApi();
