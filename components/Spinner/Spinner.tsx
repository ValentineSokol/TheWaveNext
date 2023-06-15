import React, { HTMLAttributes } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
// TODO: fix this cycle
// eslint-disable-next-line import/no-cycle
import { Text } from '@/components/Text/Text';
import styles from './Spinner.module.scss';

export function Spinner({ ...props } : HTMLAttributes<HTMLSpanElement>) {
  return <Text icon={faSpinner} iconProps={{ spin: true }} className={styles.spinner} {...props} />;
}
