import React from "react";
import {useRouter} from "next/navigation";
import styles from "./back-btn.module.scss";
import {useTranslation} from "next-i18next";

const BackBtn = () => {
    const {t} = useTranslation("common");

    const router = useRouter();

    function returnBackHandler() {
        router.push('/');
    }

    return (
        <div className={styles.back_wrapper}>
            <button
                onClick={returnBackHandler}
                className={styles.back_btn}>
                <span className={styles.back_arrow}/>
                <span className={styles.back_text}>
                    {t("back")}
                </span>
            </button>
        </div>
    );
}

export default BackBtn;
