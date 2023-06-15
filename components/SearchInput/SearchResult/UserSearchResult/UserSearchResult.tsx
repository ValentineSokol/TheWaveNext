import React from 'react';
import Link from 'next/link';
import styles from '@/components/SearchInput/SearchInput.module.scss';
import { Text } from '@/components/Text/Text';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

export function UserSearchResult({
  user, onResultItemHover, i, resultItemRefs,
}) {
  return (
    <Link
      onMouseEnter={onResultItemHover}
      data-id={user.id}
      ref={(ref) => resultItemRefs[i] = ref}
      className={styles.resultItemText}
      href={`/profile/${user.id}`}
    >
      <Text icon={faUser}>
        {user.username}
      </Text>
    </Link>
  );
}
