import React, {useEffect, useRef } from "react";

const trackedEvents = ['click', 'focusin'];
export const OutsideEventBoundary = ({ onOutsideEvent, children }) => {
    const isInsideEventRef = useRef(false);

    const handleEventGlobal = (e) => {
        if (isInsideEventRef.current) {
            isInsideEventRef.current = false;
            return;
        }
        onOutsideEvent();
    }
    const toggleGlobalListeners = (attach) => {
        const action = attach ? 'add' : 'remove';
        const method = `${action}EventListener`;

        trackedEvents.forEach(event => {
            window.document[method](event, handleEventGlobal);
        });
    }
    const handleInsideEvent = (e) => {
        isInsideEventRef.current = true;
    }

    useEffect(() => {
        toggleGlobalListeners(true);

        return toggleGlobalListeners;
    }, [isInsideEventRef.current]);
    return (
    <div onClick={handleInsideEvent} onFocus={handleInsideEvent}>
        {children}
    </div>
    );
}
