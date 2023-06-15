import React, { HTMLAttributes } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
// TODO: fix this cycle
// eslint-disable-next-line import/no-cycle
import { FontSizeProp, Text } from '@/components/Text/Text';
import styles from './Spinner.module.scss';

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement>, FontSizeProp {
  variant: 'light' | 'dark'
}
export function Spinner({ fontSize, variant = 'dark', ...props } : SpinnerProps) {
  return (
    <Text
      icon={faSpinner}
      iconProps={{ spin: true }}
      className={styles[variant]}
      fontSize={fontSize}
      {...props}
    />
  );
}
