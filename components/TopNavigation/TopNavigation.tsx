import React, { useState } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { useCurrentUser, useLogout } from '@/api/UserApi';
import { Button } from '@/components/Button/Button';
import { NAV_LINKS } from '@/components/TopNavigation/navLinks';
import { Text } from '@/components/Text/Text';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { SearchInput } from '@/components/SearchInput/SearchInput';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons/faArrowLeftLong';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import clsx from 'clsx';
import styles from './TopNavigation.module.scss';

export function TopNavigation() {
  const { t } = useTranslation('navbar');

  const { user } = useCurrentUser();
  const logout = useLogout();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const onSearchButtonClick = () => setShowMobileSearch((prev) => !prev);
  const searchInput = (
    <SearchInput
      name="topSearch"
      label={t('searchAriaLabel')}
      labelVisuallyHidden
      dropdownClassName={styles.searchDropdown}
      fullWidth
      multiSelect={false}
      placeholder={t('searchHint')}
    />
  );

  return (
    <nav className={styles.nav}>
      <div className={clsx(styles.topBar, showMobileSearch && styles.topBarSearchActive)}>
        {!showMobileSearch
                    && (
                    <div className={styles.logoWithText}>
                      <Image className={styles.logo} src={logo} alt="Logo" />
                      <Text fontSize={4}>{t('heading')}</Text>
                    </div>
                    )}
        <Button
          className={styles.mobileSearchToggle}
          icon={showMobileSearch ? faArrowLeftLong : faMagnifyingGlass}
          onClick={onSearchButtonClick}
          aria-label={t('searchAriaLabel')}
        />
        {showMobileSearch && searchInput}
      </div>
      {
                !showMobileSearch
                && (
                <ul className={styles.list}>
                  {NAV_LINKS(user).map((link) => (
                    <li key={link.href}>
                      <Link
                        className={styles.link}
                        href={link.href}
                      >
                        <Text
                          childClassName={styles.linkText}
                          fontSize={4}
                          icon={link.icon}
                        >
                          {t(link.key)}
                        </Text>
                      </Link>
                    </li>
                  ))}
                  <li className={styles.desktopSearch}>
                    {searchInput}
                  </li>
                  {user?.isLoggedIn
                        && (
                        <li className={styles.logOutBtn}>
                          <Button
                            onClick={() => logout()}
                            textClassName={styles.linkText}
                            icon={faRightFromBracket}
                            fontSize={4}
                            size="s"
                            variant="link_light"
                          >
                            {t('logout')}
                          </Button>
                        </li>
                        )}
                </ul>
                )
            }
    </nav>
  );
}
