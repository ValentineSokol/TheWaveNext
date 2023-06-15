import React from 'react';
import { FormEditor } from '@/components/Editor/FormEditor';

export function ChapterStep({ ...formAPI }) {
  return (
    <FormEditor name="chapter" error={formAPI?.formState?.errors?.chapter?.message} control={formAPI.control} />
  );
}
