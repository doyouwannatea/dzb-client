import ParticipationApi from './ParticipationApi';
import ParticipationApiMock from './ParticipationApiMock';

export const participationApi =
  import.meta.env.VITE_MOCK_API === 'true'
    ? new ParticipationApiMock()
    : new ParticipationApi();
