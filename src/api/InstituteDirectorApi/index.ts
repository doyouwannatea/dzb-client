import InstituteDirectorApi from './InstituteDirectorApi';
import InstituteDirectorApiMock from './InstituteDirectorApiMock';

export const instituteDirectorApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new InstituteDirectorApiMock()
    : new InstituteDirectorApi();
