import React, { ButtonHTMLAttributes } from 'react';
import styles from "./Button.module.scss";
import clsx from "clsx";
import {Spinner} from "../Spinner/Spinner";
import {useAutoFocus} from "@/utils/hooks/useAutoFocus";
import  { Text } from "@/components/Text/Text";
import { LeadingIcon, WithIconProp } from "@/components/LeadingIcon/LeadingIcon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, WithIconProp {
    autoFocus?: boolean,
    size?: 's' | 'm' | 'l',
    variant?: 'primary' | 'accent' | 'transparent' | 'link_light' | 'link_dark' | 'link_accent'
    isLoading?: boolean,
    disabled?: boolean,
    spinnerHideDelay?: number
}

const fontSizes = {
    s: 3,
    m: 4,
    l: 5
};
export const Button = ({ autoFocus, size = 'm', icon, iconPosition, isLoading, spinnerHideDelay, children, className, variant = 'primary', ...props} : ButtonProps) => {

    const autoFocusRef = useAutoFocus<HTMLButtonElement>(autoFocus);
    const disabled = props.disabled || isLoading;

    return (
        <button
        ref={autoFocusRef}
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
        <Spinner isLoading={isLoading}>
            {
                <Text
                    fontSize={fontSizes[size]}
                    Tag='div'
                >
                <LeadingIcon icon={icon} iconPosition={iconPosition}>
                    {children}
                </LeadingIcon>
            </Text>}
        </Spinner>
    </button>
    );
}
