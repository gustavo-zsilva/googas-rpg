import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { LegendsProvider } from '../contexts/LegendsContext';
import { Controls } from '../components/Controls';
import { Image } from '../components/Image';
import { LegendHistory } from '../components/LegendHistory';

import styles from '../styles/Home.module.css';
import { LegendInfo } from '../components/LegendInfo';
import { Backstory } from '../components/Backstory';
import { Counter } from '../components/Counter';

type Legend = {
  name: string,
  experience: number,
  rarity: string,
  imageUrl: string,
  font: string,
  description: string,
  url: string,
}

interface HomeProps {
  legends: Legend[];
}

export default function Home({ legends }: HomeProps) {

  return (
    <LegendsProvider legends={legends}>

      <Head>
          <title>Googas RPG</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>

        <header>Googas RPG</header>

        <div>
          <Backstory />
          <Counter />
        </div>

        <div>          
          <Image />
          <LegendInfo />
          <Controls />
        </div>

        <LegendHistory />

      </div>
    </LegendsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const legendsImport = await import('../legends.json');
  const legends = legendsImport.default;

  return {
    props: {
      legends,
    }
  }
}
