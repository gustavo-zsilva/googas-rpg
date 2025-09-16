import { GetStaticPaths, GetStaticProps } from 'next';
import Image from "next/legacy/image";

import { BiUserCircle } from 'react-icons/bi';

import { firestore } from '../../lib/firebase';

import styles from '../../styles/pages/User.module.css';

type User = {
    createdAt: {
        seconds: number,
        nanoseconds: number,
    },
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    name: string,
    photoUrl: string,
    spins: number,
    uid: string,
}

interface UserProps {
    user: User;
}

export default function User({ user }: UserProps) {

    return (
        <div className={styles.userContainer}>
            <header>
                { user.photoUrl ? (
                    <Image
                        width={250}
                        height={250}
                        src={user.photoUrl}
                        alt={`${user.name} Photo`}
                        objectFit="cover"
                    />
                ) : (
                    <BiUserCircle size={250} color="#bdbdbd" />
                ) }
                
                <strong>{user.name || user.email}</strong>
            </header>
            <main>

            </main>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {

    let paths = [];

    try {
        const userCollection = firestore.collection('users');
        userCollection.limit(15);
        const userData = await userCollection.get();

        paths = userData.docs.map(doc => ({
            params: {
                slug: doc.data().uid
            }
        }));

    } catch (err) {
        console.error(err);
    }

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug } = params;
    let user;

    try {
        const userCollection = firestore.collection('users');
        const userDoc = userCollection.doc(String(slug));
        const userData = await userDoc.get();
        user = JSON.parse(JSON.stringify(userData.data()));
    } catch (err) {
        console.error(err)
    }

    return {
        props: {
            user,
        },
        revalidate: 60 * 60 * 8 // 8 hours
    }
}