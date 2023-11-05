import styles from "./index.module.css";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export default function Home() {
    const {t} = useTranslation("common");
    return (
        <div className={styles.center}
             tabIndex={0}
        >
            <Link href="/create-voucher" className={styles.create}>
                {t("createNew")}
            </Link>
        </div>
    );
}

// @ts-ignore
export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            // Will be passed to the page component as props
        },
    };
}
