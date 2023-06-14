import React from "react";
import {Heading} from "@/components/Heading/Heading";
import {UserApi, useCurrentUser} from "@/api/UserApi";
import {StoryTile} from "@/components/StoryTile/StoryTile";
import {Avatar} from "@/components/Avatar/Avatar";

import styles from '@/styles/Profile.module.scss';

export default function ProfilePage({user}) {
    const {user: currentUser} = useCurrentUser();
    const isOwner = user.id === currentUser?.id;

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <Avatar url={user?.avatarUrl}/>
                <div>
                    <Heading level={1} fontSize={6}>{user?.username}</Heading>

                    <section>
                        <Heading level={2} fontSize={4}>Works</Heading>
                        <ul className={styles.storyList}>
                            {user.stories.map(story => <li key={story.id}><StoryTile story={story}/></li>)}
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}

export const getServerSideProps = async (context) => {
    const {id} = context.query;
    try {
        const {user} = await UserApi.getUser(id);

        return {props: {user}};
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
