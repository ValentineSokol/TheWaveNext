import React, { useState } from 'react';
import Image from "next/image";
import defaultAvatar from '@/assets/defaultAvatar.jpg';
import {AVATAR_HEIGHT, AVATAR_WIDTH} from "@/consts/profile/avatar";

export const Avatar = ({ url }) => {
    const [src, setSrc] = useState(url || defaultAvatar);

    const onError = () => {
        if (src !== url) return;
        setSrc(defaultAvatar);
    }
    return <Image width={AVATAR_WIDTH} height={AVATAR_HEIGHT} src={src} onError={onError} alt="" />
}
