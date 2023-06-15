import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TopNavigation } from '@/components/TopNavigation/TopNavigation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RegisterModal } from '@/components/RegisterForm/RegisterForm';

import { Head } from '@/components/Head/Head';
import useTranslation from 'next-translate/useTranslation';
import Footer from '../components/Footer/Footer';

import '@/styles/globals.css';
import '@/styles/font_scale.scss';

export default function App({ Component, pageProps }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  }));
  useEffect(() => {
    const saveUserLanguage = () => {
      const currentLocale = document.cookie.split('=')[1];
      if (currentLocale === lang) return;
      document.cookie = `NEXT_LOCALE=${lang};path=/`;
    };
    saveUserLanguage();
  }, [lang]);
  const closeTopLevelModals = () => {
    router.replace(window.location.pathname, undefined);
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Head t={t} lang={lang} />
      <RegisterModal onClose={closeTopLevelModals} open={searchParams.get('showAuthModal') === 'true'} />
      <TopNavigation />
      <ReactQueryDevtools />
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  );
}
