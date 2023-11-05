"use client";
import React from "react";
import * as yup from "yup";
import {useForm, SubmitHandler} from "react-hook-form";
import Confetti from "react-confetti";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Voucher from "@/components/voucher/Voucher";
import BackBtn from "@/components/back-btn";
import VoucherForm from "@/components/voucher-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FriendType} from "@/components/friends-list";
import styles from "./create-voucher.module.scss";


interface IFormInput {
    voucherSum: number;
    friend: string;
    message: string;
}


export default ({allFriends = []}: {
    allFriends: FriendType[]
}) => {

    const schema = yup.object().shape({
        voucherSum: yup.number().required("Voucher sum is required").min(100, "Voucher sum must be greater than 100").max(5000, "Voucher sum must be less than 5000"),
        friend: yup.string()
            .required("Friend is required")
            .min(8, "Friend name must be greater than 8")
            .max(100, "Friend name must be less than 100")
            .test("friend", "Friend not found", (value) => {
                return allFriends.some(f => f.tel.trim() === value.trim());
            }),
        message: yup.string().required("Message is required").min(3, "Message must be greater than 3").max(100, "Message must be less than 100"),
    });
    const {
        register, handleSubmit,
        watch,
        setValue,
        setError,
        reset,
        formState: {
            isSubmitSuccessful,
            isValid,
            errors
        },
    } = useForm<IFormInput>({
        mode: "all",
        defaultValues: {
            voucherSum: 100,
            friend: undefined,
            message: undefined
        },
        resolver: yupResolver(schema),

    });
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        reset();
    };

    return (
        <>
            {isSubmitSuccessful && <Confetti/>}
            <BackBtn/>
            <div className={styles.content}
                 tabIndex={0}

            >
                <div className={styles.wrapper}>
                    <Voucher sum={watch("voucherSum")} ready={isValid}/>
                </div>
                <div className={styles.drawer}>
                    <VoucherForm
                        errors={errors}
                        handleSubmit={handleSubmit}
                        watch={watch}
                        onSubmit={onSubmit}
                        register={register}
                        setValue={setValue}
                        isSubmitted={isSubmitSuccessful}
                        allFriends={allFriends}
                        isValid={isValid}
                    />
                </div>
            </div>
        </>
    );

}

export async function getServerSideProps({locale}: any) {
    const allFriends = [
        {
            name: "Guy Hawkins",
            tel: "+1 (629) 555-0129",
            avatar: "/assets/images/friends/Ellipse 7-1.png"
        },
        {
            name: "Arlene McCoy",
            tel: "+1 (684) 555-0102",
            avatar: "/assets/images/friends/Ellipse 7-2.png"
        },
        {
            name: "Robert Fox",
            tel: "+1 (603) 555-0123",
            avatar: "/assets/images/friends/Ellipse 7-3.png"
        },
        {
            name: "Marvin McKinney",
            tel: "+1 (907) 555-0101",
            avatar: "/assets/images/friends/Ellipse 7-4.png"
        },
        {
            name: "Albert Flores",
            tel: "+1 (225) 555-0118",
            avatar: "/assets/images/friends/Ellipse 7-5.png"
        },
        {
            name: "Devon Lane",
            tel: "+1 (270) 555-0117",
            avatar: "/assets/images/friends/Ellipse 7-6.png"
        },
        {
            name: "Savannah Nguyen",
            tel: "+1 (217) 555-0113",
            avatar: "/assets/images/friends/Ellipse 7-7.png"
        },
        {
            name: "Eleanor Pena",
            tel: "+1 (671) 555-0110",
            avatar: "/assets/images/friends/Ellipse 7-8.png"
        },
        {
            name: "Leslie Alexander",
            tel: "+1 (302) 555-0107",
            avatar: "/assets/images/friends/Ellipse 7-9.png"
        },
        {
            name: "Theresa Webb",
            tel: "+1 (316) 555-0116",
            avatar: "/assets/images/friends/Ellipse 7.png"
        }
    ];
    return {
        props: {
            allFriends,
            ...(await serverSideTranslations(locale, ["common"])),

        },
    };
}
