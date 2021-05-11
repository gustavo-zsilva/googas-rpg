import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { CountdownProvider } from '../contexts/CountdownContext';
import { Controls } from '../components/Controls';
import { LegendImage } from '../components/LegendImage';
import { LegendHistory } from '../components/LegendHistory';
import { LegendInfo } from '../components/LegendInfo';
import { Backstory } from '../components/Backstory';
import { Counter } from '../components/Countdown';
import { SpinCodes } from '../components/SpinCodes';
import { CodesProvider } from '../contexts/CodesContext';
import { DailyCode } from '../components/DailyCode';
import { Layout } from '../components/Layout';
import { Popup } from '../components/Popup';
import { LegendsProvider } from '../contexts/LegendsContext';

import { useAuth } from '../contexts/AuthContext';
import { firestore } from '../lib/firebase';

import styles from '../styles/pages/Home.module.css';

type Legend = {
  imageUrl: string,
  name: string,
  url: string,
  rarity: string,
  font: string,
  description: string 
}

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

interface HomeProps {
  legends: Legend[];
  firestoreUser: User;
}

export default function Home({ legends, firestoreUser }: HomeProps) {

  return (
    <LegendsProvider firestoreLegends={legends} firestoreUser={firestoreUser}>
    <CodesProvider>
    <CountdownProvider>

      <Head>
          <title>Googas RPG</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.container}>

          {/* <Popup /> */}
          
          <div>
            <Backstory />
            <Counter />
            {/* <DailyCode /> */}
            <SpinCodes />
          </div>
          
          <div>
            <LegendImage />
            <LegendInfo />
            <Controls />
          </div>

          <LegendHistory />

        </div>
      </Layout>
      
    </CountdownProvider>
    </CodesProvider>
    </LegendsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

  const { uid, token } = req.cookies;

  // If user is not authenticated
  if (token === 'null') {
    res.statusCode = 302;
    res.setHeader('Location', '/login');
    return {
      props: {},
    }
  }
  
  let legends = [];
  let firestoreUser;

  try {
    const usersCollection = firestore.collection('users');
    const userDoc = usersCollection.doc(uid);
    const userData = await userDoc.get();
    firestoreUser = JSON.parse(JSON.stringify(userData.data()));

    const legendsCollection = userDoc.collection('legends');
    const legendsData = await legendsCollection.get();

    legendsData.docs.forEach(doc => {
      legends.push(doc.data());
    })

  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      legends,
      firestoreUser,
    }
  }
}
