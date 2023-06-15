import { PasswordInput } from './PasswordInput';
import * as InputStories from '../Input/Input.stories';

const meta = {
  title: 'PasswordInput',
  component: PasswordInput,
};
export default meta;

export const Default = {
  args: { formAPI: { register: () => ({}) }, ...InputStories.Default.args },
};
