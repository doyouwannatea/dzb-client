import ProjectApi from './ProjectApi';
import ProjectApiMock from './ProjectApiMock';

export default import.meta.env.VITE_MOCK_API === 'true'
  ? ProjectApiMock
  : ProjectApi;
