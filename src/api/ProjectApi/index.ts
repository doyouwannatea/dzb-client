import ProjectApi from './ProjectApi';
import ProjectApiMock from './ProjectApiMock';

export const projectApi =
  process.env.VITE_MOCK_API === 'true'
    ? new ProjectApiMock()
    : new ProjectApi();
