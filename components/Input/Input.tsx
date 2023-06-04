import React, {HTMLAttributes, forwardRef, ReactElement, useId, ForwardedRef} from "react";
import styles from './Input.module.scss';
import clsx from "clsx";
import {ErrorText} from "../ErrorText/ErrorText";
import {AutoFocusProps, useAutoFocus} from "@/utils/hooks/useAutoFocus";

import { Text } from "@/components/Text/Text";

export interface InputProps extends HTMLAttributes<HTMLInputElement>, AutoFocusProps {
    label: string,
    slotAfterLabel?: ReactElement,
    labelVisuallyHidden?: boolean,
    name: string,
    error?: string,
    fullWidth?: boolean,
    wrapClassName?: string,
    variant?: 'normal' | 'filled',
    renderLabel?: (label : ReactElement) => ReactElement,
}
export const Input = forwardRef(({ id, variant = 'normal', onChange, autoFocus, focusCb, wrapClassName, fullWidth,  label, renderLabel, slotAfterLabel = null, labelVisuallyHidden = false, error, ...props } : InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const defaultId = useId();
    const errorId = useId();
    useAutoFocus<HTMLInputElement>(autoFocus, { focusCb, customRef: ref });

    const labelNode = <Text Tag='label' htmlFor={id || defaultId}>{`${label}:`}</Text>;
    const labelContent = renderLabel ? renderLabel(labelNode) : labelNode;
    return (
        <div className={wrapClassName}>
            {
                !labelVisuallyHidden &&
                <div className={clsx(styles.label, styles[`label_${variant}`])}>{labelContent}</div>
            }
            {slotAfterLabel}
            <input
                { ...(labelVisuallyHidden ? { ['aria-label']: label} : {} )}
                ref={ref}
                {...(error ? { ['aria-describedby']: errorId } : {})}
                aria-invalid={!!error}
                id={id || defaultId}
                onChange={onChange}
                className={clsx(
                    styles[variant],
                    error && styles.input_error,
                    fullWidth && styles.fullWidth,
                    'fs-3'
                )}
                {...props}
            />
            { error && <ErrorText id={errorId} className={styles.error}>{error}</ErrorText> }
        </div>
    )
});

Input.displayName = "Input";
