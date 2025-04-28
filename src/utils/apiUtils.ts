import { AxiosError, AxiosResponse } from "axios";
import { API_CLIENT } from "./axios";

export const fetchCSRFToken = async () => {
    try {
        await API_CLIENT('http://localhost').get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('CSRF Token fetch failed:', error);
        throw error;
    }
};

export const handleRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: object,
  callback?: () => void
): Promise<T> => {
  try {
    await fetchCSRFToken();
    const response: AxiosResponse<T> = await API_CLIENT('http://localhost')[method](url, data);

    if (callback) {
      callback();
    }
    
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message?: string }>;
    throw error;
  }
};
