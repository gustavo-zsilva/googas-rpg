import { AuthProvider } from '../contexts/AuthContext';
import { LegendsProvider } from '../contexts/LegendsContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
