import { Head, Html, Main, NextScript } from "next/document";

/**
 * Renders the HTML document with the specified language and icon.
 *
 * @return {JSX.Element} The HTML document with the specified language and icon.
 */
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/paybridge_logo.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
