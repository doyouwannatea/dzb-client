import { HTTPError } from 'ky';
import { CustomError } from '@/models/CustomError';

// TODO: на сервере в будущем надо все известные ошибки возвращать в одинаковой форме
export function isCustomError(obj: any): obj is CustomError {
  return typeof obj.error === 'string';
}

export async function handleHttpError(error: any): Promise<any> {
  if (error instanceof HTTPError) {
    const errorJson = await error.response.json();
    if (isCustomError(errorJson)) return errorJson.error;
  }
  return error;
}
