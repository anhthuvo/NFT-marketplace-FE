import { appWithTranslation } from "next-i18next";

import nextI18NextConfig from "../next-i18next.config.js";
import ThemeProvider from "../styles/styledGlobal";
import "antd/dist/antd.css";
import "../styles/tailwindGlobal.css";
import ScrollProvider from 'store/useScroll';
import Header from "../components/header";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider>
        <ScrollProvider>
          <Header />
          <Component {...pageProps} />
        </ScrollProvider>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App, nextI18NextConfig);
