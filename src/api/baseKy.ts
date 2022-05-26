import ky from 'ky';
import ICampusApi from './CampusApi/ICampusApi';

export const baseKyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  retry: { limit: 5, statusCodes: [408, 413, 429, 502, 503, 504] },
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set(
          ICampusApi.AUTH_TOKEN_NAME,
          ICampusApi.getAuthToken() || '',
        );
      },
    ],
  },
});
