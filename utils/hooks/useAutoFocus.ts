import {Ref, useEffect, useRef} from "react";


export function useAutoFocus<T extends  HTMLElement>(autoFocus: boolean, { focusCb }: { focusCb?: () => void } = {}) : Ref<T> {
    const ref = useRef<T>(null);
    const focusTimeout = useRef(null);
    
    useEffect(() => {
        if (!autoFocus) return;
        const defaultCb = () => ref.current.focus();
        // in some cases we need to defer focusing until after the element becomes visible <vSokol>
        focusTimeout.current = setTimeout(focusCb || defaultCb, 0);
        return () => clearTimeout(focusTimeout.current);
    }, [autoFocus]);

    return ref;
}
