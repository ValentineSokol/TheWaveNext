import React, {useId} from 'react';
import dynamic from 'next/dynamic';
import styles from './Editor.module.scss';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {ErrorText} from "@/components/ErrorText/ErrorText";

const ReactDraftEditor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
);
export const Editor = ({ error, ...props }) => {
    const errorId = useId();
    const toolbar = {
        options:  ['inline', 'textAlign', 'history'],
        inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough']
        }
    };
    return (
        <>
        <ReactDraftEditor editorClassName={styles.editor} toolbar={toolbar} toolbarOnFocus {...props} />
        {error && <ErrorText id={errorId}>{error}</ErrorText>}
        </>
    );
}
