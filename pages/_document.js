import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
{/* 
        <meta name="facebook-domain-verification" content="" />
        <script async src="/libs/gtm.js"></script>
        <script id="gorgias-chat-widget-install" src="/libs/gorgias.js"></script> */}
        <body>
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=xxxx"></script>
          <script async src="/libs/gtm.config.js"></script>
          <script async src="/libs/fbq.js"></script>
          <script async src="/libs/hotjar.js"></script> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
