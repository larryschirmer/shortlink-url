import axios from 'axios';

export const axiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const { message = '' } = error.response?.data ?? {};
    return message;
  }
  return 'unknown error';
};
