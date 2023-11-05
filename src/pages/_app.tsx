import LanguageSwitcher from "@/components/language-switcher";
import nextI18NextConfig from "../../next-i18next.config.js";
import {appWithTranslation, i18n} from "next-i18next";
import "./globals.css";


const MyApp = ({Component, pageProps}: any) => {
    return <div className="page">
        <main className="main">
            <LanguageSwitcher/>
            <Component {...pageProps} />
        </main>
    </div>;
};


export default appWithTranslation(MyApp, nextI18NextConfig);
