import '@/styles/globals.css';
import Footer from "@/components/Footer/Footer";

export default function App({Component, pageProps}) {
    return (
    <>
        <Component {...pageProps} />;
        <Footer />
    </>
    );
}
