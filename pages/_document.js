import { Html, Head, Main, NextScript } from 'next/document';
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
          <link rel="manifest" href='/manifest.json' />
          <meta name='theme-color' content="#1c70c0" />
      </Head>
      <body>
        <div id="modalRoot" />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
