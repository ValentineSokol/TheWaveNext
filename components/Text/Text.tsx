import React, {JSX, HTMLProps, ReactNode, ReactElement} from "react";
import clsx from "clsx";
import { LeadingIcon, WithIconProp } from "@/components/LeadingIcon/LeadingIcon";

export interface FontSizeProp {
    fontSize?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
}
export interface TextProps extends HTMLProps<any>, FontSizeProp, WithIconProp {
    children?: ReactElement,
    className?: string,
    childClassName?: string,
    Tag?: keyof JSX.IntrinsicElements
}
export const Text = ({ children, className, childClassName, icon, onIconClick, iconPosition, iconAriaLabel, iconProps, Tag = 'span', fontSize = 3, ...props }: TextProps) => {
    return (
        <Tag className={clsx(className,`fs-${fontSize}`)} {...props}>
            <LeadingIcon iconAriaLabel={iconAriaLabel} icon={icon} iconPosition={iconPosition} onIconClick={onIconClick} iconProps={iconProps}>
                <span className={childClassName}>{children}</span>
            </LeadingIcon>
        </Tag>
    );
}
