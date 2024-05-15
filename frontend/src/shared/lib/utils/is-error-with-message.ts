import type { ErrorResponse } from 'react-router-dom';

interface IErrorResponse {
  data: {
    message: string;
  };
  status: ErrorResponse['status'];
}

export const isErrorWithMessage = (error: unknown): error is IErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'data' in error &&
    typeof (error as Record<string, unknown>).data === 'object' &&
    error.data !== null
  );
};
