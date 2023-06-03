import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/styles/globals.css';
import '@/styles/font_scale.scss';

import Footer from '../components/Footer/Footer';
import {TopNavigation} from "@/components/TopNavigation/TopNavigation";
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/router";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {RegisterModal} from "@/components/RegisterForm/RegisterForm";
import {useEffect} from "react";

export default function App({Component, pageProps}) {

    const searchParams = useSearchParams();
    const router = useRouter();
    const { locale } = router;

    useEffect(() => {
        saveUserLanguage();
    }, [locale]);

    const saveUserLanguage = () => {
        const currentLocale = document.cookie.split('=')[1];
        if (currentLocale === locale) return;
        document.cookie = `NEXT_LOCALE=${locale};path=/`;
    }
    const closeTopLevelModals = () => {
        router.replace(window.location.pathname, undefined);
    }
    return (
        <QueryClientProvider client={new QueryClient()}>
            <RegisterModal onClose={closeTopLevelModals} open={searchParams.get('showAuthModal') === 'true'} />
            <TopNavigation />
            <ReactQueryDevtools />
            <Component {...pageProps} />
            <Footer />
        </QueryClientProvider>
    );
}
