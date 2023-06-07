import React from "react";
import NextHead from "next/head";

export const Head = ({ t, lang }) => (
    <NextHead>
        <title>{t('title', { fallback: 'common:title' })}</title>
        <meta name="description" content={t('common:description')} />
    </NextHead>
);
