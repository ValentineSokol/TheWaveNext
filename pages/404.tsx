import React from 'react';
import Image from 'next/image';

import useTranslation from 'next-translate/useTranslation';
import styles from '../styles/PageNotFound.module.scss';
import stranded from '../assets/stranded.jpg';
import lifebuoy from '../assets/lifebuoy.png';

export default function PageNotFound() {
  const { t } = useTranslation('404');
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div>
          <Image alt="" aria-hidden className={styles.lifebuoyImg} src={lifebuoy} />
          <h1>{t('heading')}</h1>
          <p>{t('text')}</p>
        </div>
        <Image alt="" aria-hidden="true" className={styles.strandedImg} src={stranded} />
      </div>
    </main>
  );
}

export const metadata = {
  title: 'You got lost (404)',
};
