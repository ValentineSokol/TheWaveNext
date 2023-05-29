import React, { useEffect, useRef } from "react";
export const useDebounce = (fn, waitFor = 200) => {
    const timeoutRef = useRef(null);
        useEffect(() => () => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }, []);
        return (...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            timeoutRef.current = setTimeout(() => fn(...args), waitFor);
        }
    };
