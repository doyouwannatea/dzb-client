import InstituteDirectorApi from './InstituteDirectorApi';
import InstituteDirectorApiMock from './InstituteDirectorApiMock';

export const instituteDirectorApi =
  process.env.VITE_MOCK_API === 'true'
    ? new InstituteDirectorApiMock()
    : new InstituteDirectorApi();
