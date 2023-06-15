import React from 'react';

import clsx from 'clsx';
import styles from './ProgressBar.module.scss';

export function ProgressBar({ className, label, percentage }) {
  return (
    <div className={clsx(
      className,
      percentage <= 0 && styles.zeroPercent,
    )}
    >
      <div
        role="progressbar"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuenow={percentage}
        aria-valuemax={100}
        style={{ maxWidth: `${percentage}%` }}
        className={styles.outer}
      >
        <div className={styles.inner}>
          {label || `${percentage}%`}
        </div>

      </div>
    </div>
  );
}
