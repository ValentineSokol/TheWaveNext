import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faPenClip } from "@fortawesome/free-solid-svg-icons/faPenClip";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';

const LOGGED_IN_LINKS = (user) => [
    { text: 'Profile', href: `/profile/${user?.id}`, icon: faUser },
    { text: 'Write a story', href: '/stories/post', icon: faPenClip },
    { text: 'Chat', href: '/chat', icon: faComments },
];

const LOGGED_OUT_LINKS = [
    { text: 'Register', href: `${typeof window !== 'undefined' ? window.location.pathname : '/'}?showAuthModal=true`, icon: faRightToBracket },
]
export const NAV_LINKS = (user) => [
    { text: 'Home', href: '/', icon: faHouse },
    ...(user?.isLoggedIn ? LOGGED_IN_LINKS(user)  : LOGGED_OUT_LINKS),
]
