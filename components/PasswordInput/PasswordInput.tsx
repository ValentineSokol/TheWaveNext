import React, { useState } from "react";
import {faEye} from "@fortawesome/free-solid-svg-icons/faEye";
import {faEyeSlash} from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import {Button} from "../Button/Button";
import {Input, InputProps} from "../Input/Input";
import { Text} from "@/components/Text/Text";

import styles from './PasswordInput.module.scss';
import useTranslation from "next-translate/useTranslation";
export const PasswordInput = (props: InputProps) => {
    const { t } = useTranslation('register');

    const [show, setShow] = useState(false);

    const icon = show ? faEyeSlash : faEye;

    const toggleShowPassword = (e) => {
        e.preventDefault();
        setShow(prev => !prev);
    }

    return (
        <div>
            <Input
                {...props}
                name="password"
                type={show ? 'text' : 'password'}
                renderLabel={(label) => (
                    <span className={styles.header}>
                        {label}
                        <Button
                            icon={icon}
                            size='s'
                            variant="transparent"
                            onClick={toggleShowPassword}
                        >
                            <Text>{show ? t('register:hide') : t('register:show')}</Text>
                        </Button>
                    </span>
                )}
            />
        </div>
    )
};
