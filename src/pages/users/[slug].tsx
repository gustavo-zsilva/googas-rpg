import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import { firestore } from '../../lib/firebase';

export default function User() {

    const router = useRouter();
    const { slug } = router.query;

    return (
        <div>
            
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

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {

        },
        revalidate: 60 * 60 * 8 // 8 hours
    }
}