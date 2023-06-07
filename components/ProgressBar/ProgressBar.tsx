import React from "react";

import styles from './ProgressBar.module.scss';
import clsx from "clsx";

export const ProgressBar = ({ className, label, percentage }) => {
    return (
        <div className={clsx(
            className,
            percentage <= 0 && styles.zeroPercent
        )}>
        <div
            role='progressbar'
            tabIndex={0}
            aria-valuemin={0}
            aria-valuenow={percentage} aria-valuemax={100} style={{ maxWidth: `${percentage}%`}} className={styles.outer}>
            <div className={styles.inner}>
                {label || `${percentage}%`}
            </div>

        </div>
        </div>
    )
}
