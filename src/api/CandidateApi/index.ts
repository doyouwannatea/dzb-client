import CandidateApi from './CandidateApi';
import CandidateApiMock from './CandidateApiMock';

export const candidateApi =
  process.env.VITE_MOCK_API === 'true'
    ? new CandidateApiMock()
    : new CandidateApi();
