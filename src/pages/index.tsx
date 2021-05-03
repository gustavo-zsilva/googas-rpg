import Head from 'next/head';
import { useRouter } from 'next/router';
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

import { useAuth } from '../contexts/AuthContext';

import styles from '../styles/pages/Home.module.css';

export default function Home() {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.emailVerified) router.push('/login');
  }, [user])

  return (
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
  )
}
