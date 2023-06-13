import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import styles from "./Button.module.scss";
import clsx from "clsx";
import {Spinner} from "../Spinner/Spinner";
import {useAutoFocus} from "@/utils/hooks/useAutoFocus";
import {FontSizeProp, Text} from "@/components/Text/Text";
import { WithIconProp} from "@/components/LeadingIcon/LeadingIcon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, WithIconProp, FontSizeProp {
    autoFocus?: boolean,
    textClassName?: string,
    size?: 's' | 'm' | 'l',
    variant?: 'primary' | 'accent' | 'transparent' | 'link_light' | 'link_dark' | 'link_accent' | 'outline'
    isLoading?: boolean,
    disabled?: boolean,
    spinnerHideDelay?: number
}

const fontSizes = {
    s: 3,
    m: 4,
    l: 5
};
export const Button = forwardRef(({
                           fontSize,
                           textClassName,
                           autoFocus,
                           size = 'm',
                           icon,
                           iconPosition,
                           iconProps,
                           isLoading,
                           spinnerHideDelay,
                           children,
                           className,
                           variant = 'primary',
                           ...props
                       }: ButtonProps, ref) => {

    const autoFocusRef = useAutoFocus<HTMLButtonElement>(autoFocus, { customRef: ref });
    const disabled = props.disabled || isLoading;

    return (
        <button
            ref={ref || autoFocusRef}
            disabled={disabled}
            className={clsx(
                className,
                styles.common,
                styles[variant],
                styles[`size_${size}`],
                disabled && styles.disabled,
            )}
            {...props}
        >
            {
                isLoading ?
                    <Spinner/> :
                    <Text
                        childClassName={textClassName}
                        icon={icon}
                        iconPosition={iconPosition}
                        iconProps={iconProps}
                        fontSize={fontSize || fontSizes[size]}
                        Tag='div'
                    >
                        {children}
                    </Text>
            }
        </button>
    );
});

Button.displayName = 'Button';
