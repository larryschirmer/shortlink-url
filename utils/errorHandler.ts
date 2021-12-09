import axios from 'axios';

export const axiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const res = error.toJSON() as { message?: string };
    return res.message || '';
  }
  return 'unknown error';
};
