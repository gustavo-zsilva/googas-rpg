import Image from "next/legacy/image";
import Link from 'next/link';

import { useSpring, animated } from '@react-spring/web';

import { useAuth } from '../contexts/AuthContext';

import { BiUserCircle } from 'react-icons/bi';

import styles from '../styles/components/Header.module.css';

export function Header() {

    const { user, signOut } = useAuth();
    const springStyles = useSpring({
        from: {
            y: -100
        },
        to: {
            y: 0
        }
    })

    return (
        <animated.header style={{ ...springStyles }} className={styles.headerContainer}>
            <h3>
                <Link href="/" style={{ cursor: 'pointer' }} legacyBehavior>
                    <Image src="/assets/logo.png" width={100} height={100} />
                </Link>
            </h3>
            { user ? (
                <div className={styles.loggedIn}>
                    <div>
                        { user.photoUrl ? (
                            <div>
                                <Image
                                    width={35}
                                    height={35}
                                    src={user.photoUrl}
                                    alt={user.name}
                                    style={{ borderRadius: '50%' }}
                                    objectFit="cover"
                                />
                            </div>
                        ) : (
                            <BiUserCircle size={45} color="#bdbdbd" />
                        ) }

                        { !user.emailVerified && <span className={styles.emailNotVerified}>! Verify your email</span> }

                        <span>{user.isAnonymous ? 'Anonymous' : user.name ? user.name : user.email}</span>
                    </div>
                    
                    <button onClick={signOut}>Log Out</button>
                </div>
            ) : (
                <div className={styles.loggedOut}>
                    <span>Você não está logado.</span>

                    <Link href="/login" legacyBehavior>
                        <button>
                            Login
                        </button>
                    </Link>
                </div>
            ) }
        </animated.header>
    );
}