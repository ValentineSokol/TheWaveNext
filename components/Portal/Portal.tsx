import React, {ReactElement, useEffect, useRef} from 'react';
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactElement,
    elementId?: string
}
export const Portal = ({ children, elementId } : PortalProps) => {
    const portalRef = useRef<HTMLElement>(null);

    useEffect(() => {
        portalRef.current = elementId ? document.getElementById(elementId) : document.body;
    }, [elementId]);

    if (!portalRef.current) return null;
    return createPortal(children, portalRef.current);
};
