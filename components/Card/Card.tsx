import React, {HTMLAttributes} from "react";
import styles from './Card.module.scss';
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
}
export const Card = ({ children, className, ...props } : CardProps) => {
    return (
        <div className={clsx(className, styles.card)} {...props}>
            {children}
        </div>
    )
}
