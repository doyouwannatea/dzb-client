import SkillsApi from './SkillsApi';
import SkillsApiMock from './SkillsApiMock';

export const skillsApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new SkillsApiMock()
    : new SkillsApi();
