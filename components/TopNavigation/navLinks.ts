import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faComments } from '@fortawesome/free-solid-svg-icons/faComments';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faPenClip } from '@fortawesome/free-solid-svg-icons/faPenClip';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons/faRightToBracket';

const LOGGED_IN_LINKS = (user) => [
  { key: 'profile', href: `/profile/${user?.id}`, icon: faUser },
  { key: 'chat', href: '/chat', icon: faComments },
];

const LOGGED_OUT_LINKS = [
  { key: 'register', href: '?showAuthModal=true', icon: faRightToBracket },
];
export const NAV_LINKS = (user) => [
  { key: 'home', href: '/', icon: faHouse },
  { key: 'post', href: '/stories/post', icon: faPenClip },
  ...(user?.isLoggedIn ? LOGGED_IN_LINKS(user) : LOGGED_OUT_LINKS),
];
