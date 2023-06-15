import React from 'react';
import { Modal } from '@/components/Modal/Modal';
import { Button } from '@/components/Button/Button';

const meta = {
  title: 'Modal',
  component: Modal,
};

export const Default = {
  args: {
    open: true,
    onClose: () => {},
    render: (args) => (
      <Modal {...args}>
        <Button>Modal Content</Button>
      </Modal>
    ),
  },
};
export default meta;
