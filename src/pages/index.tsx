import styles from "./index.module.css";
import Link from "next/link";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {CreateButton} from "@/components/create-btn";

export default function Home() {
    return (
        <div className={styles.center}
             tabIndex={0}
        >
            <Link href="/create-voucher">
                <CreateButton/>
            </Link>
        </div>
    );
}

// @ts-ignore
export async function getStaticProps({locale}) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}
