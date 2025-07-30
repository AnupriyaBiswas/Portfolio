// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/profile.jpg" type="image/jpeg" />
        {/* optional: for better cross-browser support */}
        <link rel="apple-touch-icon" href="/assets/profile.jpg" />
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
