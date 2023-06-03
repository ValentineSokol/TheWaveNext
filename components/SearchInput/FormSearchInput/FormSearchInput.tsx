import React from "react";
import {SearchInput, SearchInputProps} from "@/components/SearchInput/SearchInput";
import {Controller, ControllerProps} from "react-hook-form";

interface FormSearchInputProps extends SearchInputProps, ControllerProps {
    onResultItemSelect: () => void,
    onResultItemRemove: () => void,
}
export const FormSearchInput = ({ control, onResultItemSelect, onResultItemRemove, name, ...props }: FormSearchInputProps) => {

    const onChange = (field, add = true) => (selectedItems, id) => {
        const cb = add ? onResultItemSelect : onResultItemRemove;
        field.onChange(selectedItems);
        cb?.(selectedItems, id);
    }
    const renderInput = ({ field }) => <SearchInput selectedValues={field.value} onResultSelect={onChange(field)} onResultRemove={onChange(field, false)} {...props} />;
    return (
       <Controller defaultValue={[]} name={name} control={control} render={renderInput} />
    )
}
