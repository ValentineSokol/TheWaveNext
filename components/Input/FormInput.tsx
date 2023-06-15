import React from 'react';
import { Input, InputProps } from '@/components/Input/Input';
import { UseFormReturn } from 'react-hook-form';

export interface FormInputProps extends InputProps {
  formAPI: UseFormReturn,
  name: string,
}
export function FormInput({ name, formAPI, ...props } : FormInputProps) {
  return <Input {...props} {...formAPI.register(name)} focusCb={() => formAPI.setFocus(name)} />;
}
