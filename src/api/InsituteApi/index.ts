import InsituteApi from './InsituteApi';
import InsituteApiMock from './SkillsApiMock';

export const insituteApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new InsituteApiMock()
    : new InsituteApi();
