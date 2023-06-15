/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';

const trackedEvents = ['click', 'focusin'];
export function OutsideEventBoundary({ onOutsideEvent, children }) {
  const isInsideEventRef = useRef(false);

  const handleEventGlobal = () => {
    if (isInsideEventRef.current) {
      isInsideEventRef.current = false;
      return;
    }
    onOutsideEvent();
  };
  const toggleGlobalListeners = (attach) => {
    const action = attach ? 'add' : 'remove';
    const method = `${action}EventListener`;

    trackedEvents.forEach((event) => {
      window.document[method](event, handleEventGlobal);
    });
  };
  const handleInsideEvent = () => {
    isInsideEventRef.current = true;
  };

  useEffect(() => {
    toggleGlobalListeners(true);
    return () => toggleGlobalListeners(false);
  }, [isInsideEventRef.current]);
  return (
    <div onClick={handleInsideEvent} onFocus={handleInsideEvent}>
      {children}
    </div>
  );
}
