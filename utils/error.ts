import axios from 'axios';

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const res = error.toJSON() as { message?: string };

    return res.message || '';
  }
  return 'unknown error';
};

export const handleUnexpectedError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error);
    return '';
  }
  return 'unknown error';
};
