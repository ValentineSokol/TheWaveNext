import React from 'react';
import styles from '@/components/SearchInput/SearchInput.module.scss';
import { useRouter } from 'next/router';
import { Button } from '../../../Button/Button';

export function StoryMetadataSearchResult({
  result, onResultItemHover, onResultItemSelect = () => {}, i, resultItemRefs,
}) {
  const { locale, defaultLocale } = useRouter();

  return (
    <Button
      size="s"
      variant="transparent"
      onClick={onResultItemSelect(`name_${locale}`)}
      onMouseEnter={onResultItemHover}
      data-id={result.id}
      ref={(ref) => { resultItemRefs[i] = ref; }}
      className={styles.resultItemText}
    >
      {result[`name_${locale}`] || result[`name_${defaultLocale}`]}
    </Button>
  );
}
