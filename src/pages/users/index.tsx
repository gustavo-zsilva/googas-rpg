import { GetStaticProps } from "next"
import { Layout } from "../../components/Layout";
import { firestore } from "../../lib/firebase";

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
        <Layout>

        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    let users = [];

    try {
        const usersCollection = firestore.collection('users');
        usersCollection.limit(15);
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