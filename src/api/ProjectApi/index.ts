import ProjectApi from './ProjectApi';
import ProjectApiMock from './ProjectApiMock';

export default import.meta.env.MODE === 'mock' ? ProjectApiMock : ProjectApi;
