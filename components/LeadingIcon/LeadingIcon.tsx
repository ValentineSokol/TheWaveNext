import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, { ReactElement } from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

import styles from './LeadingIcon.module.scss';

export interface WithIconProp {
    icon?: IconProp,
    iconPosition?: 'leading' | 'trailing'
}
interface LeadingIconProps extends WithIconProp{
    children: ReactElement,
}
export const LeadingIcon = ({ children, icon, iconPosition = 'leading' } : LeadingIconProps) : ReactElement => {
    if (!icon) return children;

    const renderedIcon = <FontAwesomeIcon className={styles[iconPosition]} icon={icon}/>;
    const content = [renderedIcon, children];

    return (
        <>
            {iconPosition === 'leading' ? content : [...content].reverse()}
        </>
    );
}
