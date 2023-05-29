import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/PageNotFound.module.scss';
import stranded from '../assets/stranded.jpg';
import lifebuoy from '../assets/lifebuoy.png';
import useTranslation from 'next-translate/useTranslation';


export default function PageNotFound() {
    const { t } = useTranslation('404');
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div>
                    <Image alt="" aria-hidden={true} className={styles.lifebuoyImg} src={lifebuoy} />
                    <h1>{t('heading')}</h1>
                    <p>{t('text')}</p>

                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/chat">Chat</Link></li>
                        <li><Link href="/stories">Stories</Link></li>
                    </ul>

                </div>
                <Image alt="" aria-hidden={"true"} className={styles.strandedImg} src={stranded}/>
            </div>
        </main>
    )
}

export const metadata = {
    title: 'You got lost (404)'
}
