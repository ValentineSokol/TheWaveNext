import { ErrorText } from './ErrorText';

const meta = {
  title: 'ErrorText',
  component: ErrorText,
};
export default meta;

export const Default = {
  args: {
    children: 'Incorrect username or password!',
    id: 'loginFormError',
    onIconClick: undefined,
  },
};
