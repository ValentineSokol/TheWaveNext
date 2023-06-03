import React from "react";
import styles from '../styles/Chat.module.scss';

import {Heading} from "@/components/Heading/Heading";

export default function Chat() {
    return (
        <div className={styles.wrapper}>
            <main>
                chats here
            </main>
            <aside>
                chatrooms here
            </aside>
        </div>
    );
}
