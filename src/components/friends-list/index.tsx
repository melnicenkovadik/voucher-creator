import React, {FC} from "react";
import s from "./friends-list.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

interface IFriendsList {
    isOpen: boolean;
    friendPickHandler: (friend: FriendType) => void;
    friends: FriendType[];
}

export type  FriendType = {
    name: string;
    tel: string;
    avatar: string;
    search?: string;
}

const FriendsList: FC<IFriendsList> = ({isOpen, friendPickHandler, friends}) => {
    if (!isOpen || friends?.length === 0) return null;
    return (
        <motion.div
            initial={{
                height: 0,
            }}
            animate={{
                height: "auto",
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 2
            }}
            whileTap={{scale: 0.99}}
            className={s.friends_list}
             tabIndex={1}
        >
            {
                friends.map((friend, index) => {
                    return (
                        <div className={s.friends_list__item} key={index}
                             onClick={(e) => friendPickHandler(friend)}
                             onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                     friendPickHandler(friend);
                                 }
                             }}
                             tabIndex={2}
                        >
                            <Image
                                className={s.friends_list__item__avatar}
                                src={friend.avatar} alt={friend.name} width={40} height={40}/>
                            <div className={s.friends_list__item__info}>
                                <h3>{friend.name}</h3>
                                <p>{friend.tel}</p>
                            </div>
                        </div>
                    );
                })
            }
        </motion.div>
    );
};

export default FriendsList;
