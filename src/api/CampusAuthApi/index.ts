import CampusAuthApi from './CampusAuthApi';
import CampusAuthApiMock from './CampusAuthApiMock';

export const campusAuthApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new CampusAuthApiMock()
    : new CampusAuthApi();
