import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarker } from '@fortawesome/free-solid-svg-icons/faMarker';
import { Input } from './Input';

const meta = {
  title: 'Input',
  component: Input,
};
export default meta;

export const Default = {
  args: {
    name: 'Username',
    label: 'Username',
    register: () => ({}),
  },
};

export const WithError = {
  args: {
    ...Default.args,
    error: 'Username already taken!',
  },
};

export const WithCustomLabel = {
  args: {
    ...Default.args,
    label: 'Custom label with icon',
    renderLabel: (label) => (
      <div>
        {label}
        {' '}
        <FontAwesomeIcon icon={faMarker} />
      </div>
    ),
  },
};
