import React from "react";
import {FormEditor} from "@/components/Editor/FormEditor";
export const ChapterStep = ({ ...formAPI }) => {
    return (
        <>
            <FormEditor name='chapter' control={formAPI.control} />
        </>

    );
}
