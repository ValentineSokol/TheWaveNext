import React, {useRef, useEffect} from 'react';
import styles from './Modal.module.scss';
import {Button} from "@/components/Button/Button";
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {toggleScroll} from "@/utils/toggleScroll";
import {Portal} from "@/components/Portal/Portal";

export const Modal = ({children, open, onClose}) => {

    const ref = useRef(null);

    useEffect(() => {
        const dialog = ref.current;
        if (open) dialog?.showModal();
        toggleScroll();

        return () => dialog?.close();
    }, [open]);

    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }
    return (
        <Portal elementId="modalRoot">
            <dialog onClose={handleClose} ref={ref} className={styles.modal}>
                    <Button
                        aria-label='Close modal'
                        icon={faXmark}
                        onClick={handleClose}
                        className={styles.close}
                        variant="transparent"
                    />
                {children}
            </dialog>
        </Portal>
    );
}
