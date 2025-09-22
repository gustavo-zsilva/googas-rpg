import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { LegendsListProvider } from '../contexts/LegendsListContext';
import { Layout } from '../components/Layout';
import { LegendsList } from '../components/LegendsList';

import { firestore } from '../lib/firebase';

import { AiFillStar } from 'react-icons/ai';

import legendsJSON from '../legends.json';
import styles from '../styles/pages/Legends.module.css';

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
        </LegendsListProvider>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { uid } = req.cookies;
    let firestoreLegends = [];

    const allLegends = legendsJSON;

    try {
        const userCollection = firestore.collection('users');
        const userDoc = userCollection.doc(uid);
        const legendsCollection = userDoc.collection('legends');
        const legendsData = await legendsCollection.get();
        firestoreLegends = legendsData.docs.map(doc => doc.data());
        // Organize by rarity: mythical, legendary, epic, rare, common
        allLegends.sort((a, b) => {
            const rarityOrder = ['mythical', 'legendary', 'epic', 'rare', 'uncommon', 'common'];
            return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        });

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