import axios from 'axios';

export const axiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const { message = '', error: errorMessage = '' } =
      error.response?.data ?? {};
    return message || errorMessage;
  }
  return 'unknown error';
};
