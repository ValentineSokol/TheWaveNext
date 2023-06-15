import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}
export function Card({ children, className, ...props } : CardProps) {
  return (
    <div className={clsx(className, styles.card)} {...props}>
      {children}
    </div>
  );
}
