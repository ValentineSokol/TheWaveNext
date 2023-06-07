import React from "react";
import {Head} from "@/components/Head/Head";
import {Heading} from "@/components/Heading/Heading";
import {UserApi, useCurrentUser} from "@/api/UserApi";
import {Text} from "@/components/Text/Text";
import {SearchInput} from "@/components/SearchInput/SearchInput";

export default function ProfilePage({user}) {
    const {user: currentUser} = useCurrentUser();
    const isOwner = user.id === currentUser?.id;

    return (
        <main>
            <Heading level={1} fontSize={6}>{` ${user?.username}'s Profile`}</Heading>
        </main>
    );
}

export const getServerSideProps = async (context) => {
    const {id} = context.query;
    try {
        const { user } = await UserApi.getUser(id);

        return { props: { user } };
    } catch (err) {
        if (err.status === 404) {
            return {
                redirect: {
                    permanent: false,
                    destination: "/404",
                },
                props: {},
            };
        }
    }
}
