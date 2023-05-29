import React, {JSX, HTMLProps, ReactNode} from "react";
import clsx from "clsx";

export interface FontSizeProp {
    fontSize?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
}
interface TextProps extends HTMLProps<any>, FontSizeProp {
    children?: ReactNode,
    className?: string,
    Tag?: keyof JSX.IntrinsicElements
}
export const Text = ({ children, className, Tag = 'span', fontSize = 3, ...props }: TextProps) => {
    return <Tag className={clsx(className,`fs-${fontSize}`)} {...props}>{children}</Tag>
}
