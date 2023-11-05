import React  from "react";
import { motion } from "framer-motion";

import s from "./create-btn.module.scss";
import {useTranslation} from "next-i18next";

export const CreateButton = () => {
    const {t} = useTranslation("common");


    return (
        <motion.div
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, cursor: "pointer" }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 2
            }}
            className={s.styled_btn}
        >
            {t("createNew")}

        </motion.div>
    );
};
