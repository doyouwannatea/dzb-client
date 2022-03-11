import CampusAuthApi from './CampusAuthApi';
import CampusAuthApiMock from './CampusAuthApiMock';

export default import.meta.env.VITE_MOCK_API === 'true'
  ? CampusAuthApiMock
  : CampusAuthApi;
