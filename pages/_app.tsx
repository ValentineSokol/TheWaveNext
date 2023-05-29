import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/styles/globals.css';
import '@/styles/font_scale.scss';

import Footer from '../components/Footer/Footer';

export default function App({Component, pageProps}) {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Component {...pageProps} />
            <Footer />
        </QueryClientProvider>
    );
}
