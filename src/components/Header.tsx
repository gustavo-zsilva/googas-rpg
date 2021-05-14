import Image from 'next/image';
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
                <Link href="/">
                    <a>
                        {/* <img src="/assets/logo.jpg" alt="Logo" /> */}
                        <span>Googas RPG</span>
                    </a>
                </Link>
            </h3>
            
            { user ? (
                <div className={styles.loggedIn}>
                    <div>
                        { user.photoUrl ? (
                            <div>
                                <Image
                                    width={45}
                                    height={45}
                                    src={user.photoUrl}
                                    alt={user.name}
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

                    <Link href="/login">
                        <button>
                            Login
                        </button>
                    </Link>
                </div>
            ) }
            
        </animated.header>
    );
}