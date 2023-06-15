import React, { HTMLAttributes } from 'react';

import { FontSize, Text } from '@/components/Text/Text';

import { LeadingIcon, WithIconProp } from '@/components/LeadingIcon/LeadingIcon';
import clsx from 'clsx';
import styles from './Heading.module.scss';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, WithIconProp {
  level?: 1 | 2 | 3 | 4 | 5 | 6,
  fontSize?: FontSize
}

const defaultFontSize = {
  1: 8,
};
export function Heading({
  children, className, icon, iconPosition, level = 1, fontSize = 4, ...props
}: HeadingProps) {
  const Tag: keyof JSX.IntrinsicElements = `h${level}`;

  return (
    <Text
      className={clsx(styles.heading, className)}
      fontSize={fontSize || defaultFontSize[level]}
      Tag={Tag}
      {...props}
    >
      <LeadingIcon icon={icon} iconPosition={iconPosition}>
        {children}
      </LeadingIcon>
    </Text>
  );
}
