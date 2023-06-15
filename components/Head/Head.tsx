import React from 'react';
import NextHead from 'next/head';

export function Head({ t }) {
  return (
    <NextHead>
      <title>{t('title', { fallback: 'common:title' })}</title>
      <meta name="description" content={t('common:description')} />
    </NextHead>
  );
}
