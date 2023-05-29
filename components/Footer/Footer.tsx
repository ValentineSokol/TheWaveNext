import React from 'react';
import styles from './Footer.module.scss';

import Sea from './SeaAnimation/Sea';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons/faLinkedinIn";

import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage'
import {Button} from "@/components/Button/Button";
import {supportedLocales} from "@/locales/supportedLocales";

export default function Footer() {
    const {t} = useTranslation('footer');
    const changeLanguage = (locale) => async () => setLanguage(locale);

    return (
        <footer className={styles.footer}>
            <section>
                <h3>{t('chooseLang')}</h3>
                <ul aria-label={t('chooseLang')}>
                    {
                        supportedLocales.map(({code, name}) => (
                            <li key={code}>
                                <Button onClick={changeLanguage(code)} size='s' variant='link_light'>
                                    {name}
                                </Button>
                            </li>
                        ))
                    }
                </ul>
            </section>
            <section>
                <h3>{t('contactUs')}</h3>
                {' '}
                <a
                    aria-label={t('links.linkedIn')}
                    href="https://www.linkedin.com/in/valentine-sokolovskiy-b9256b219/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FontAwesomeIcon icon={faLinkedinIn}/>
                </a>
            </section>

            <section>
                <h3>Legal</h3>
            </section>
            <Sea/>
        </footer>
    );
}
