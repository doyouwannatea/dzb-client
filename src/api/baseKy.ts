import ky from 'ky';
import { useToast } from 'vue-toastification';
import {
  AUTH_TOKEN_KEY,
  getAuthTokenFromCookies,
} from './CampusApi/utils/authToken';

const toast = useToast();

export const baseKyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  retry: { limit: 5, statusCodes: [408, 413, 429, 502, 503, 504] },
  hooks: {
    beforeRequest: [
      (request) => {
        const authToken = getAuthTokenFromCookies();
        if (authToken) request.headers.set(AUTH_TOKEN_KEY, authToken);
      },
    ],
    afterResponse: [
      (input, options, response) => {
        if (response.status === 429) {
          toast.warning('Сервер перегружен, пожалуйста подождите.');
        }
      },
    ],
  },
});
