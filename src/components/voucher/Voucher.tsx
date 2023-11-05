import React, {FC, useMemo} from "react";
import styles from "./Voucher.module.scss";
import Image from "next/image";
import {useTranslation} from "next-i18next";

interface IVoucher {
    sum: number;
    ready: boolean;
}

const Voucher: FC<IVoucher> = ({sum = 100, ready = false}) => {
    const {t} = useTranslation("common");

    const percent = useMemo(() => {
        const max = 5000;
        const min = 100;
        return (sum - min) / (max - min);
    }, [sum]);
    const wrapperStyles = useMemo(() => {
        return {
            filter: `hue-rotate(${percent * 390}deg)`,
            boxShadow: `0 0 20px rgba(0, 0, 0, ${percent})`,
        };

    }, [sum]);

    const presetStyles = useMemo(() => {
        return {
            filter: !ready ? `brightness(${0.4 * 2})` : `brightness(${1.3})`,
        };
    }, [sum,ready]);

    const textStyle = useMemo(() => {
        return {
            filter: ready ? `brightness(${1.3})` : `brightness(${0.45 * 2})`,
        };
    } , [sum,ready]);

    return (
        <div className={styles.voucher}
             style={wrapperStyles}
        >
            <Image
                className={styles.voucher__present}
                style={presetStyles}
                src="/assets/images/present_322x291.png"
                width={322}
                height={291}
                alt={"present"}/>

            <div className={styles.voucher__body}>
                <div className={styles.voucher__top}>
                    <div className={styles.voucher__top_title}
                         style={textStyle}
                    >
                        <h2>
                            {t("gift_voucher")}
                        </h2>
                    </div>
                </div>
                <div className={styles.voucher__bottom}>
                    <div className={styles.voucher__bottom_value}
                            style={textStyle}
                    >
                        <h2>{sum}$</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Voucher;
