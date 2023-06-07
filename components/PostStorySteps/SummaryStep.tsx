import React from "react";
import {FormInput} from "@/components/Input/FormInput";
import {FormEditor} from "@/components/Editor/FormEditor";
export const SummaryStep = ({ ...formAPI }) => {
    return (
        <>
        <FormInput error={formAPI?.formState?.errors?.name?.message} autoFocus fullWidth variant='filled' formAPI={formAPI} name="name" label="Name" />
        <FormEditor error={formAPI?.formState?.errors?.summary?.message} control={formAPI.control} name='summary' />
        </>

    );
}
