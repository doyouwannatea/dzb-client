import SupervisorApi from './SupervisorApi';
import SupervisorApiMock from './SupervisorApiMock';

export const supervisorApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new SupervisorApiMock()
    : new SupervisorApi();
