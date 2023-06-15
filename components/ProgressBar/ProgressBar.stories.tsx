import { ProgressBar } from '@/components/ProgressBar/ProgressBar';

const meta = {
  title: 'ProgressBar',
  component: ProgressBar,
};

export default meta;

export const Default = {
  args: {
    percentage: 50,
  },
};

export const CustomLabel = {
  args: {
    percentage: 30,
    label: 'loading...',
  },
};
