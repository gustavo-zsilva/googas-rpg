import Head from 'next/head';

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

import styles from '../styles/pages/Home.module.css';
import { Popup } from '../components/Popup';

export default function Home() {

  return (
    <CodesProvider>
    <CountdownProvider>

      <Head>
          <title>Googas RPG</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div className={styles.container}>

          <Popup />

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

