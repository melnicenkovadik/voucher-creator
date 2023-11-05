import React, {FC, useCallback, useRef} from "react";
import Image from "next/image";
import clsx from "clsx";
import FriendsList, {FriendType} from "@/components/friends-list";
import useOutsideClick from "@/hooks/useOnClickOutside";
import {useRouter} from "next/navigation";
import {useTranslation} from "next-i18next";
import styles from "./voucher-form.module.scss";
import { motion } from "framer-motion";

interface IVoucherForm {
    handleSubmit: any;
    errors: any;
    onSubmit: any;
    register: any;
    setValue: any;
    watch: any;
    isSubmitted: boolean;
    allFriends: FriendType[];
    isValid: boolean;
}

const VoucherForm: FC<IVoucherForm> = ({
                                           handleSubmit,
                                           errors,
                                           onSubmit,
                                           register,
                                           watch,
                                           setValue,
                                           isSubmitted,
                                           allFriends,
                                           isValid
                                       }) => {
    const {t} = useTranslation("common");

    const friendsInputRef = useRef(null);
    const [focused, setFocused] = React.useState(false);
    const [friends, setFriends] = React.useState<FriendType[]>(allFriends);
    const router = useRouter();

    const friendPickHandler = useCallback((friend: FriendType) => {
        setValue("friend", friend.tel);
        setFocused(false);
    }, [setValue]);

    const focusHandler = (bool: boolean) => {
        setFocused(bool);
    };

    function friendsInputHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const friend = e.target.value;
        if (e.target.value) {
            setValue("friend", friend);
            setFriends(allFriends.filter(f => {
                const searchStr = f.tel.replace(/\D/g, "") + f.name.replace(/\s/g, "").toLowerCase();
                return searchStr.includes(friend);
            }));

        } else {
            setFriends(allFriends);
        }
    }

    useOutsideClick<HTMLDivElement>(friendsInputRef, () => focusHandler(false));

    if (isSubmitted) {
        return (
            <div
                className={styles.confettiWrapper}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={styles.confettiWrapper__content}>
                    <div className={styles.confettiWrapper__content__title}>
                        {t("voucherCreated")}
                    </div>
                    <div className={styles.confettiWrapper__content__subtitle}>
                        {t("voucherCreatedSubtitle")}
                    </div>
                    <br/>
                    <br/>
                    <div className={styles.confettiWrapper__content__btn}>
                        <button className={styles.submitBtn} onClick={() => router.push("/")}>
                            {t("goToHome")}
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }
    return (
        <>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="voucherSum">{t("voucherSum")}</label>
                    <div className={styles.slidecontainer} id="smallslider">
                        <input
                            type="range"
                            className={styles.slider}
                            min={100}
                            max={5000}
                            defaultValue={100}
                            step={100}
                            {...register("voucherSum", {
                                required: true,
                                valueAsNumber: true,
                            })}

                        />
                    </div>
                </div>
                <div className={styles.inputError}>
                    {errors?.voucherSum?.message || "  "}
                </div>
                <div className={styles.inputWrapper}>
                    <FriendsList isOpen={focused} friendPickHandler={friendPickHandler} friends={friends}/>

                    <label htmlFor="friend">{t("friendsPhoneNumber")}</label>

                    <div className={styles.inputWrapper__inputContainer}
                         ref={friendsInputRef}
                         onClick={e => focusHandler(true)}
                    >
                        <Image
                            className={clsx(styles.inputWrapper__inputContainer__inputIcon, styles.inputWrapper__inputContainer__inputIconLeft)}
                            width={24}
                            height={24}
                            src="/assets/icons/search_24x24.svg"
                            alt="search"/>
                        <input
                            type="text"
                            className={clsx(styles.input, styles.inputWithIconLeft)}
                            placeholder={t("searchForAFriend")}
                            autoComplete="off"
                            {...register("friend", {
                                required: true,
                                onChange: (e: React.ChangeEvent<HTMLInputElement>) => friendsInputHandler(e),
                            })}
                        />
                    </div>
                </div>
                <div className={styles.inputError}>
                    {errors?.friend?.message || "  "}
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="message">
                        {t("message")}
                    </label>
                    <textarea
                        className={styles.textarea}
                        placeholder={t("typeAMessage")}
                        {...register("message", {
                            required: true,
                        })}
                    />
                </div>
                <div className={styles.inputError}>
                    {errors?.message?.message || "  "}
                </div>
                <motion.button
                    whileTap={{ scale: !isValid ? 0.3 : 1 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}

                    disabled={!isValid}
                    type="submit" className={styles.submitBtn}>
                    {t("createVoucher")}
                </motion.button>
            </form>
        </>
    );
};

export default VoucherForm;
