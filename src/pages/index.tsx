import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { LegendsContext, LegendsProvider } from '../contexts/LegendsContext';
import { Controls } from '../components/Controls';
import { Image } from '../components/Image';
import { LegendHistory } from '../components/LegendHistory';
import { LegendInfo } from '../components/LegendInfo';
import { Backstory } from '../components/Backstory';
import { Counter } from '../components/Countdown';
import { SpinCodes } from '../components/SpinCodes';

import localForage from 'localforage';

import styles from '../styles/Home.module.css';
import { CodesProvider } from '../contexts/CodesContext';
import { useContext } from 'react';

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
      
    </CodesProvider>
  )
}

