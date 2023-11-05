import React, {useEffect} from "react";
import {useRouter} from "next/router";
import clsx from "clsx";

const LanguageSwitcher = () => {
    const router = useRouter();
    const {locale} = router;
    const handleLanguageChange = (lang: string) => {
        router.push(router.pathname, router.asPath, {locale: lang});
    };

    const isActive = (lang: string) => {
        return lang === locale ? "active" : "";
    };

    return (
        <div className="language_switcher">
            <div
                className={clsx("language_switcher__item", isActive("en"))}
                onClick={() => handleLanguageChange("en")}>
                EN
            </div>
            <div
                className={clsx("language_switcher__item", isActive("ua"))}
                onClick={() => handleLanguageChange("ua")}>
                UA
            </div>
        </div>
    );

};

export default LanguageSwitcher;
