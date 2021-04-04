import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { LegendsProvider } from '../contexts/LegendsContext';
import { Controls } from '../components/Controls';
import { Image } from '../components/Image';
import { LegendHistory } from '../components/LegendHistory';

import styles from '../styles/Home.module.css';
import { LegendInfo } from '../components/LegendInfo';
import { Backstory } from '../components/Backstory';

type Legend = {
  name: string,
  experience: number,
  rarity: string,
  url: string,
  font: string,
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

        <div>
          <Backstory />
        </div>

        <div>
          <header>Googas RPG</header>
          
          <Image />
          <LegendInfo />
          <Controls />
        </div>

        <div>
          <LegendHistory />
        </div>

      </div>
    </LegendsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const legendsImport = await import('../legends.json');
  const legends = legendsImport.default;

  return {
    props: {
      legends,
    }
  }
}
