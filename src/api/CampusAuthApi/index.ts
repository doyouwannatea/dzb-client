import CampusAuthApi from './CampusAuthApi';
import CampusAuthApiMock from './CampusAuthApiMock';

export default import.meta.env.MODE === 'mock'
  ? CampusAuthApiMock
  : CampusAuthApi;
