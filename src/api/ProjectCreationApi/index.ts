import ProjectCreationApi from './ProjectCreationApi';
import ProjectCreationApiMock from './ProjectCreationApiMock';

export const projectCreationApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new ProjectCreationApiMock()
    : new ProjectCreationApi();
