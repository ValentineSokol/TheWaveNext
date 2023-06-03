import {Ref, useEffect, useRef} from "react";


export interface AutoFocusProps {
    autoFocus?: boolean,
    focusCb?: () => void,
}
export function useAutoFocus<T extends  HTMLElement>(autoFocus: boolean, { focusCb, customRef }: { focusCb?: () => void, customRef?: any } = {}) : Ref<T> {
    const ref = useRef<T>(null);
    const focusTimeout = useRef(null);

    useEffect(() => {
        if (!autoFocus) return;
        const defaultCb = () => (customRef || ref).current.focus();
        // in some cases we need to defer focusing until after the element becomes visible <vSokol>
        focusTimeout.current = setTimeout(focusCb || defaultCb, 0);
        return () => clearTimeout(focusTimeout.current);
    }, [autoFocus]);

    return ref;
}
