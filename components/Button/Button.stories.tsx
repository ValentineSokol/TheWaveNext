import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { Button } from './Button';

const meta = {
  title: 'Button',
  component: Button,
};
export default meta;

export const Default = {
  args: {
    children: 'Button',
    variant: 'primary',
    onClick: () => {},
  },
};

export const WithIcon = {
  args: {
    ...Default.args,
    icon: faCheck,
  },
};
