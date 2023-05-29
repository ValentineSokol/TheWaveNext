import React from 'react';
import styles from './Footer.module.scss';

import Sea from './SeaAnimation/Sea';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons/faLinkedinIn";

import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage'
import {Button} from "@/components/Button/Button";

export default function Footer() {
    const { t } = useTranslation('footer');
    const changeLanguage = async (e) => {
        if (!e.target.name) return;
        await setLanguage(e.target.name);
    }

    return (
        <footer className={styles.footer}>
            <section>
                <h3>{t('chooseLang')}</h3>
                <ul onClick={changeLanguage} aria-label={t('chooseLang')}>
                    <li>
                        <Button size='s' name='uk' variant='link_light'>Українська</Button>

                    </li>
                    <li>
                        <Button size='s' name='en' variant='link_light'>English</Button>
                    </li>
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
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            </section>

            <section>
                <h3>Legal</h3>
            </section>
            <Sea />
        </footer>
    );
}
