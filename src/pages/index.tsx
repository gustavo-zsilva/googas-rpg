import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { LegendsProvider } from '../contexts/LegendsContext';
import { Controls } from '../components/Controls';
import { Image } from '../components/Image';

import styles from '../styles/Home.module.css';

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
        <header>Googas RPG</header>

        <Image />
        <Controls />
      </div>
    </LegendsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await import('../data.json');
  const legends = response.default;

  return {
    props: {
      legends,
    }
  }
}
