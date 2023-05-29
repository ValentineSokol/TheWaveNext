import React, { HTMLAttributes, ReactElement, useId} from "react";
import styles from './Input.module.scss';
import clsx from "clsx";
import {ErrorText} from "../ErrorText/ErrorText";
import { UseFormReturn} from "react-hook-form";
import {useAutoFocus} from "@/utils/hooks/useAutoFocus";

import { Text } from "@/components/Text/Text";

export interface InputProps extends HTMLAttributes<HTMLInputElement> {
    autoFocus?: boolean,
    label: string,
    name: string,
    error?: string,
    fullWidth?: boolean,
    wrapClassName?: string,
    variant?: 'normal' | 'filled',
    renderLabel?: (label : ReactElement) => ReactElement,
    formAPI : UseFormReturn

}
export const Input = ({ variant = 'normal', autoFocus, wrapClassName, fullWidth,  label, formAPI, name, renderLabel, error, ...props } : InputProps) => {
    const id = useId();
    const errorId = useId();
    useAutoFocus<HTMLInputElement>(autoFocus, { focusCb: () => formAPI.setFocus(name) });

    const labelNode = <Text Tag='label' htmlFor={id}>{`${label}:`}</Text>;
    return (
        <div className={wrapClassName}>
            {
                renderLabel ?
                <div className={styles[`label_${variant}`]} >{renderLabel(labelNode)}</div>
                    :
                <div className={styles[`label_${variant}`]}>{labelNode}</div>
            }
            <input
                aria-describedby={error ? errorId : ''}
                {...formAPI.register(name)}
                aria-invalid={!!error}
                id={id}
                className={clsx(
                    styles[variant],
                    error && styles.input_error,
                    fullWidth && styles.fullWidth,
                    'fs-3'
                )} {...props} />
            { error && <ErrorText id={errorId} className={styles.error}>{error}</ErrorText> }
        </div>
    )

};
