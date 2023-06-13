import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

import styles from './LeadingIcon.module.scss';
import {Button} from "@/components/Button/Button";

export interface WithIconProp {
    icon?: IconProp,
    onIconClick?: () => void,

    iconAriaLabel?:string,
    iconPosition?: 'leading' | 'trailing',
    iconProps?: Omit<FontAwesomeIconProps, 'icon'>
}
interface LeadingIconProps extends WithIconProp {
    children: ReactElement,
}
export const LeadingIcon = ({ children, icon, iconProps, onIconClick, iconAriaLabel, iconPosition = 'leading' } : LeadingIconProps) : ReactElement => {
    if (!icon) return children;

    const renderedIcon = onIconClick ?
        <Button variant='transparent' onClick={onIconClick} aria-label={iconAriaLabel} size='s' icon={icon} />
        :
        <FontAwesomeIcon className={styles[iconPosition]} icon={icon} {...iconProps} />;
    const content = [renderedIcon, children];

    return (
        <>
            <div>{iconPosition === 'leading' ? content : [...content].reverse()}</div>
        </>
    );
}
