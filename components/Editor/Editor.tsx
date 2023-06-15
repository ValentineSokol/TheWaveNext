import React, { useId } from 'react';
import dynamic from 'next/dynamic';
import { ErrorText } from '@/components/ErrorText/ErrorText';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Editor.module.scss';

const ReactDraftEditor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
);
export function Editor({ error, ...props }) {
  const errorId = useId();
  const toolbar = {
    options: ['inline', 'textAlign', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough'],
    },
  };
  return (
    <>
      <ReactDraftEditor
        editorClassName={styles.editor}
        toolbar={toolbar}
        toolbarOnFocus
        {...props}
      />
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </>
  );
}
