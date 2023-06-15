import React from 'react';
import { Editor } from '@/components/Editor/Editor';
import { Controller } from 'react-hook-form';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export function FormEditor({
  name,
  control,
  error,
  ...props
}) {
  const toHTML = (state) => () => draftToHtml(convertToRaw(state.getCurrentContent()));
  const toPlainText = (state) => () => state.getCurrentContent().getPlainText();
  const onEditorStateChange = (field) => (state) => field.onChange({
    state,
    toHTML: toHTML(state),
    toPlainText: toPlainText(state),
  });
  const renderEditor = ({ field }) => (
    <Editor
      error={error}
      onBlur={field.onBlur}
      editorState={field.value?.state}
      onEditorStateChange={onEditorStateChange(field)}
      {...props}
    />
  );

  return <Controller control={control} render={renderEditor} name={name} />;
}
