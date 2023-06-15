import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Button } from '@/components/Button/Button';
import styles from './LeadingIcon.module.scss';

export interface WithIconProp {
  icon?: IconProp,
  onIconClick?: () => void,

  iconAriaLabel?:string,
  iconPosition?: 'leading' | 'trailing',
  iconProps?: Omit<FontAwesomeIconProps, 'icon'>
}
interface LeadingIconProps extends WithIconProp {
  children: ReactNode,
}
export function LeadingIcon({
  children,
  icon,
  iconProps,
  onIconClick,
  iconAriaLabel,
  iconPosition = 'leading',
} : LeadingIconProps) {
  if (!icon) return children;

  const renderedIcon = onIconClick
    ? <Button variant="transparent" onClick={onIconClick} aria-label={iconAriaLabel} size="s" icon={icon} />
    : <FontAwesomeIcon className={styles[iconPosition]} icon={icon} {...iconProps} />;
  const content = [renderedIcon, children];

  return (
    <div className={onIconClick && styles.clickable}>{iconPosition === 'leading' ? content : [...content].reverse()}</div>
  );
}
