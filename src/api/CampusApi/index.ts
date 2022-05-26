import CampusApi from './CampusApi';
import CampusApiMock from './CampusApiMock';

export const campusApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new CampusApiMock()
    : new CampusApi();
