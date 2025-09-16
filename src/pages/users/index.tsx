import { GetStaticProps } from "next"
import Image from "next/legacy/image";
import Link from 'next/link';

import { firestore } from "../../lib/firebase";

import { BiUserCircle } from 'react-icons/bi';

import styles from '../../styles/pages/Users.module.css';

type User = {
    createdAt: Date,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    name: string,
    photoUrl: string,
    spins: number,
    redeemedCodes: [],
    uid: string,
}

interface UsersProps {
    users: User[];
}

export default function Users({ users }: UsersProps) {
    return (
        <div>
            <div className={styles.usersContainer}>
                {users.map(user => {
                    return (
                        <Link href={`/users/${user.uid}`} key={user.uid} legacyBehavior>
                            <div className={styles.userCard}>
                                { user.photoUrl ? (
                                    <div style={{ display: 'flex', borderRadius: '50%' }}>
                                        <Image
                                            width={100}
                                            height={100}
                                            src={user.photoUrl}
                                            alt={`${user.name} Photo`}
                                            objectFit="cover"
                                        />
                                    </div>
                                ) : (
                                    <BiUserCircle size={100} color="#bdbdbd" />
                                ) }

                                <div className={styles.userContent}>
                                    <strong>{user.name || user.email}</strong>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {

    let users = [];

    try {
        const usersCollection = firestore.collection('users');
        usersCollection.limit(10);
        const usersData = await usersCollection.get();
        users = JSON.parse(JSON.stringify(usersData.docs.map(doc => doc.data())));

    } catch (err) {
        console.error(err);
    }

    return {
        props: {
            users,
        },
        revalidate: 60 * 60 * 8 // 8 hours
    }
}