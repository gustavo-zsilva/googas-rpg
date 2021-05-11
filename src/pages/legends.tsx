import Head from 'next/head';
import { GetServerSideProps, GetStaticProps } from 'next';

import { LegendsListProvider } from '../contexts/LegendsListContext';
import { Layout } from '../components/Layout';
import { LegendsList } from '../components/LegendsList';

import { AiFillStar } from 'react-icons/ai';

import styles from '../styles/pages/Legends.module.css';
import { firestore } from '../lib/firebase';

type Legend = {
    name: string,
    rarity: string,
    imageUrl: string,
    font: string,
    description: string,
    url: string,
}

interface LegendsProps {
    allLegends: Legend[];
    firestoreLegends: Legend[];
}

export default function Legends({ allLegends, firestoreLegends }: LegendsProps) {
    return (
        <LegendsListProvider legends={allLegends} firestoreLegends={firestoreLegends}>
        <Layout>
            <Head>
                <title>Legends | Googas RPG</title>
            </Head>

            <div className={styles.legendsContainer}>
                <h3>
                    <AiFillStar size={32} color="var(--primary)" />
                    <span>Legends Tier List</span>
                </h3>
                <LegendsList />
            </div>
        </Layout>
        </LegendsListProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { uid } = req.cookies;
    let firestoreLegends = [];

    const legendsJSON = await import('../legends.json');
    const allLegends = legendsJSON.default;

    try {
        const userCollection = firestore.collection('users');
        const userDoc = userCollection.doc(uid);
        const legendsCollection = userDoc.collection('legends');
        const legendsData = await legendsCollection.get();
        firestoreLegends = legendsData.docs.map(doc => doc.data());

    } catch (err) {
        console.log(err);
    }

    return {
        props: {
            allLegends,
            firestoreLegends,
        },
    }
}