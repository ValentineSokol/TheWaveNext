import { Text } from '@/components/Text/Text';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons/faArrowLeftLong';

const meta = {
  title: 'Text',
  component: Text,
};

export const Default = {
  args: {
    Tag: 'p',
    children: 'A text node with variable font size scale',
    onIconClick: undefined,
  },
};

export const WithLeadingIcon = {
  args: {
    icon: faArrowLeftLong,
    ...Default.args,
  },
};
export const WithTrailingIcon = {
  args: {
    icon: faArrowLeftLong,
    iconPosition: 'trailing',
    ...Default.args,
  },
};
export const WithClickableIcon = {
  args: {
    icon: faArrowLeftLong,
    iconPosition: 'trailing',
    ...Default.args,
    onIconClick: () => alert('action!'),
  },
};
export default meta;
