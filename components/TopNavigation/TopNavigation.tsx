import React, {useState} from 'react';
import Link from 'next/link';
import {useCurrentUser} from "@/api/UserApi";
import {Button} from "@/components/Button/Button";
import {NAV_LINKS} from "@/components/TopNavigation/navLinks";
import styles from './TopNavigation.module.scss';
import {Text} from "@/components/Text/Text";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import {SearchInput} from "@/components/SearchInput/SearchInput";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons/faArrowLeftLong";
import Image from "next/image";
import logo from '@/assets/logo.png';
import clsx from "clsx";


export const TopNavigation = () => {
    const {user} = useCurrentUser();
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const onSearchButtonClick = () => setShowMobileSearch(prev => !prev);
    const searchInput = <SearchInput dropdownClassName={styles.searchDropdown} fullWidth multiSelect={false} labelVisuallyHidden placeholder='type to start a new search' />

    return (
        <nav className={styles.nav}>
            <div className={clsx(styles.topBar, showMobileSearch && styles.topBarSearchActive)}>
                { !showMobileSearch &&
                <div className={styles.logoWithText}>
                    <Image className={styles.logo} src={logo} alt='Logo'/>
                    <Text fontSize={4}>The Fanfic Wave</Text>
                </div>
                }
                <Button className={styles.mobileSearchToggle}
                        icon={showMobileSearch ? faArrowLeftLong : faMagnifyingGlass} onClick={onSearchButtonClick}
                        aria-label='Search Wave'/>
                {showMobileSearch && searchInput}
            </div>
            {
                !showMobileSearch &&
                <ul className={styles.list}>
                        {NAV_LINKS(user).map((link) => (
                            <li key={link.href}>
                                <Link className={styles.link} href={link.href}><Text childClassName={styles.linkText}
                                                                                     fontSize={4}
                                                                                     icon={link.icon}>{link.text}</Text></Link>
                            </li>
                        ))}
                    <li className={styles.desktopSearch}>
                        {searchInput}
                    </li>
                    {user?.isLoggedIn &&
                        <li className={styles.logOutBtn}><Button textClassName={styles.linkText} icon={faRightFromBracket} fontSize={4} size='s'
                                    variant="link_light">Log Out</Button></li>
                    }
                </ul>
            }
        </nav>
    )
}
