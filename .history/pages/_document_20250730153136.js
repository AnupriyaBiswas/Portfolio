// D:\Programs\Projects\portfolio\pages\_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/assets/profile.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Portfolio Website" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-black text-white font-mono">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
