import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '../contexts/AuthContext';

import { BiUser } from 'react-icons/bi';

import styles from '../styles/components/Header.module.css';

export function Header() {

    const { user, signInWithGoogle, signInAnonymously, signOut } = useAuth();

    return (
        <header className={styles.headerContainer}>
            <h3>
                <Link href="/">
                    <button>
                        <img src="/assets/logo.jpg" alt="Logo" />
                    </button>
                </Link>
            </h3>

            { user ? (
                <div className={styles.loggedIn}>
                    <div>
                        { user.photoUrl ? (
                            <Image
                                width={50}
                                height={50}
                                src={user.photoUrl}
                                alt={user.name}
                                objectFit="cover"
                            />
                        ) : (
                            <BiUser size={32} color="#bdbdbd" />
                        ) }
                       

                        <span>{user.isAnonymous ? 'Anonymous' : user.name}</span>
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
        </header>
    );
}