import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>

        <meta name="facebook-domain-verification" content="" />
        <script async src="/libs/gtm.js"></script>
        <script id="gorgias-chat-widget-install" src="/libs/gorgias.js"></script>
        <body>
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=xxxx"></script>
          <script async src="/libs/gtm.config.js"></script>
          <script async src="/libs/fbq.js"></script>
          <script async src="/libs/hotjar.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
