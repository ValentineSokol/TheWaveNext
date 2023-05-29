import React from "react";
import NextHead from "next/head";

export const Head = ({ t }) => (
    <NextHead>
        <title>{t('title')}</title>
        <meta name="description" content={t('description')}/>
    </NextHead>
);
