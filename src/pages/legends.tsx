import Head from 'next/head';
import { Layout } from '../components/Layout';
import { LegendsList } from '../components/LegendsList';

import { AiFillStar } from 'react-icons/ai';

import styles from '../styles/pages/Legends.module.css';

export default function Legends() {
    return (
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
    );
}