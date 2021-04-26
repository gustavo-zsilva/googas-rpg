import { GetServerSideProps } from 'next';

import { LegendsProvider } from '../contexts/LegendsContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <LegendsProvider>
      <Component {...pageProps} />
    </LegendsProvider>
  )
}

export default MyApp
