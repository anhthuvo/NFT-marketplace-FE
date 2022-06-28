import { appWithTranslation } from 'next-i18next';

import nextI18NextConfig from '../next-i18next.config.js';
import ThemeProvider from '../styles/styledGlobal';
import 'antd/dist/antd.css';
import '../styles/tailwindGlobal.css';

import Header from '../components/header';
import Footer from '../components/footer';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
