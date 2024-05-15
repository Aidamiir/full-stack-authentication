import { isErrorWithMessage } from './is-error-with-message';
import type { ToastPromiseParams } from 'react-toastify';

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
      const message = isError ? data.data.message : error;
      return message;
    }
  }
}
};

// TODO: временный костыль в типизации any
type GetToastPromiseMessages<T = any> = (props: PropsMessages) => ToastPromiseParams<T>;

type PropsMessages = {
  pending: string;
  success: string;
  error?: string;
};
