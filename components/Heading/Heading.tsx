import React, {HTMLAttributes, ReactNode} from "react";
import styles from './Heading.module.scss';

import {Text} from "@/components/Text/Text";

import { LeadingIcon, WithIconProp } from "@/components/LeadingIcon/LeadingIcon";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, WithIconProp {
    level?: 1 | 2 | 3 | 4 | 5 | 6,
    fontSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

const defaultFontSize = {
    1: 8,
};
export const Heading = ({children, icon, iconPosition, level = 1, fontSize = 4, ...props}: HeadingProps) => {
    const Tag: keyof JSX.IntrinsicElements = `h${level}`;


    return (
        <Text
            className={styles.heading}
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
