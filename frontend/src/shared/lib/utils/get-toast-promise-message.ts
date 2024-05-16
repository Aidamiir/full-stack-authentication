import type { ToastPromiseParams } from 'react-toastify';
import { isErrorWithMessage } from './is-error-with-message';

export const getToastPromiseMessages:GetToastPromiseMessages = (props) => {
  const { pending, success, error = 'Произошла непредвиденная ошибка' } = props;

  return {
    pending: {
      render: () => pending
    },
    success: {
      render: () => success
  },
    error: {
      render: ({ data }) => {
      const isError = isErrorWithMessage(data);
      return isError ? data.data.message : error;
    }
  }
}
};

type GetToastPromiseMessages<T = unknown> = (props: PropsMessages) => ToastPromiseParams<T>;

type PropsMessages = {
  pending: string;
  success: string;
  error?: string;
};
