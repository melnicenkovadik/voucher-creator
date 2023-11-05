import React, {FC, useMemo} from "react";
import styles from "./voucher.module.scss";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {motion} from "framer-motion";

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

    }, [percent]);

    const presetStyles = useMemo(() => {
        return {
            filter: !ready ? `brightness(${0.4 * 2})` : `brightness(${1.3})`,
        };
    }, [ready]);

    const textStyle = useMemo(() => {
        return {
            filter: ready ? `brightness(${1.3})` : `brightness(${0.45 * 2})`,
        };
    }, [ready]);

    return (
        <motion.div
            initial={{scale: 0}}
            animate={{scale: 1}}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 2
            }}
            whileTap={{scale: 0.99}}
            className={styles.voucher}
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
        </motion.div>
    );
};

export default Voucher;
