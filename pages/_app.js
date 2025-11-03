// D:\Programs\Projects\portfolio\pages\_app.js
import "../styles/globals.css";
import CustomCursor from "../components/CustomCursor.jsx";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CustomCursor />
    </>
  )
}
