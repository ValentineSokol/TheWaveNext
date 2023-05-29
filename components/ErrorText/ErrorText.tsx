import React, {ReactNode} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTriangleExclamation} from "@fortawesome/free-solid-svg-icons/faTriangleExclamation";
import {getAnimationsEnabled} from "../../utils/getAnimationsEnabled";

import styles from './ErrorText.module.scss';
import clsx from "clsx";

import {Text} from "@/components/Text/Text";

interface ErrorTextProps {
    className?: string,
    children: ReactNode,
    id: string
}

export const ErrorText = ({className, children, id}: ErrorTextProps) => ((
    <Text id={id} className={clsx(styles.errorText, className)} role="alert">
        <FontAwesomeIcon icon={faTriangleExclamation} beatFade={getAnimationsEnabled()}/>
        {children}
    </Text>
));
