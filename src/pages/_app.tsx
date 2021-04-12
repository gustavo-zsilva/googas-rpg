import { CodesProvider } from '../contexts/CodesContext';
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
