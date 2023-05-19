import CandidateApi from './CandidateApi';
import CandidateApiMock from './CandidateApiMock';

export const candidateApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new CandidateApiMock()
    : new CandidateApi();
