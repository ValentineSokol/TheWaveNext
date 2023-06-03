import React, {useState} from 'react';
import {landingCards} from '@/consts/landing/landingCards';
import styles from "../styles/Landing.module.scss";
import {Button} from "@/components/Button/Button";
import useTranslation from 'next-translate/useTranslation';
import {RegisterModal} from "@/components/RegisterForm/RegisterForm";
import {Head} from "@/components/Head/Head";
import {Heading} from "@/components/Heading/Heading";
import {Text} from "@/components/Text/Text";
import {useCurrentUser} from "@/api/UserApi";

export default function Landing() {
    const {t} = useTranslation('landing');
    const [registerOpen, setRegisterOpen] = useState(false);
    const onRegisterClose = () => setRegisterOpen(false);

    return (
        <>
            <Head t={t} />
            <main>
                <RegisterModal open={registerOpen} onClose={onRegisterClose} t={t}/>
                <section className={styles.hero}>
                    <Heading fontSize={6}>{t('heading')}</Heading>
                    <Button autoFocus size='l' onClick={() => setRegisterOpen(true)}>{t('cta')}</Button>
                </section>
                <Heading level={2} fontSize={6}>{t('valueProposition')}</Heading>
                <ul className={styles.bullets}>
                    {landingCards.map(card => (
                        <li key={card.heading}>
                            <Heading icon={card.icon} level={3} fontSize={5}>{t(card.heading)}</Heading>
                            <Text fontSize={4} Tag='p'>{t(card.text)}</Text>
                        </li>
                    ))
                    }
                </ul>
            </main>
        </>
    )
}
