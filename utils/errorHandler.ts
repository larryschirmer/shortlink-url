import axios from 'axios';

export const axiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const res = error.toJSON() as { message?: string };

    return res.message || '';
  }
  return 'unknown error';
};

export const unexpectedError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error);
    return '';
  }
  return 'unknown error';
};
