import Head from 'next/head';

import { CountdownProvider } from '../contexts/CountdownContext';
import { Controls } from '../components/Controls';
import { Image } from '../components/Image';
import { LegendHistory } from '../components/LegendHistory';
import { LegendInfo } from '../components/LegendInfo';
import { Backstory } from '../components/Backstory';
import { Counter } from '../components/Countdown';
import { SpinCodes } from '../components/SpinCodes';
import { CodesProvider } from '../contexts/CodesContext';

import styles from '../styles/Home.module.css';

type Legend = {
  name: string,
  experience: number,
  rarity: string,
  imageUrl: string,
  font: string,
  description: string,
  url: string,
}

export default function Home() {

  return (
    <CodesProvider>
    <CountdownProvider>

      <Head>
          <title>Googas RPG</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>

        <header>Googas RPG</header>

        <div>
          <Backstory />
          <Counter />
          <SpinCodes />
        </div>

        <div>
          <Image />
          <LegendInfo />
          <Controls />
        </div>

        <LegendHistory />

      </div>
      
    </CountdownProvider>  
    </CodesProvider>
  )
}

