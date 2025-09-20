import { Layout } from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';
import { LegendsProvider } from '../contexts/LegendsContext';
import { TokenProvider } from '../contexts/TokenContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TokenProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TokenProvider>
    </AuthProvider>
  )
}

export default MyApp
