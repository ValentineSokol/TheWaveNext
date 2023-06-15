import React, { Ref, SyntheticEvent } from 'react';
import { UserSearchResult } from '@/components/SearchInput/SearchResult/UserSearchResult/UserSearchResult';
import {
  StoryMetadataSearchResult,
} from '@/components/SearchInput/SearchResult/StoryMetadataSearchResult/StoryMetadataSearchResult';

interface SearchResultProps {
  result: { entity: string }
  onResultItemHover: (e: SyntheticEvent) => void,
  onResultItemSelect: (nameKey: string) => (e: SyntheticEvent) => void,
  i: number,
  resultItemRefs: Ref<any>[]
}
export function SearchResultFactory({ result, ...props } : SearchResultProps) {
  if (result.entity === 'user') return <UserSearchResult user={result} {...props} />;
  return <StoryMetadataSearchResult result={result} {...props} />;
}
