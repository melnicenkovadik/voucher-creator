import { Head, Html, Main, NextScript } from 'next/document';

import nexti18nextConfig from '../../next-i18next.config';

export default function Document () {
  const currentLocale = nexti18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
