import { axiosError } from './errorHandler';
import { AxiosError } from 'axios';

describe('axiosError', () => {
  it('should return custom message if not from axios', () => {
    const errorMessage = 'unknown error';
    const error = new Error(errorMessage);
    const result = axiosError(error);
    expect(result).toEqual(errorMessage);
  });
  it('should return the message portion of an axios error', () => {
    const errorMessage = 'error message';
    const error: AxiosError = {
      config: {},
      isAxiosError: true,
      toJSON: () => ({}),
      response: {
        status: 200,
        statusText: '',
        headers: {},
        config: {},
        data: {
          message: errorMessage,
        },
      },
      name: '',
      message: '',
    };
    const result = axiosError(error);
    expect(result).toEqual(errorMessage);
  });
});
