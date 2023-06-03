import React from "react";
import {FormInput} from "@/components/Input/FormInput";

export const SummaryStep = ({ ...formAPI }) => {
    return (
        <>
        <FormInput variant='filled' formAPI={formAPI} name="name" label="Name" />
        <FormInput variant='filled' formAPI={formAPI} name="summary" label="Summary" />
        </>

    );
}
