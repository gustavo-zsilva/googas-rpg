import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Bebas+Neue&family=Chenla&family=Dancing+Script&family=Indie+Flower&family=New+Tegomin&family=Roboto+Mono&family=Train+One&family=Rajdhani:wght@600&family=Zilla+Slab+Highlight&family=Staatliches&display=swap" rel="stylesheet" />

            <link rel="shortcut icon" href="/assets/favicon.ico" type="image/icon"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument