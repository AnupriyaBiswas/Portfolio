import { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import Main from "../components/Main";
import Contact from "../components/Contact";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import EducationTimeline from "../components/EducationTimeline";

// Dynamically load About (prevents it from blocking initial load)
const About = dynamic(() => import("../components/About"), {
  loading: () => <div className="text-white text-center py-10">Loading About...</div>,
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    // preload About section and background image
    import("../components/About");
    const bgImg = new Image();
    bgImg.src = "/assets/moon-bg.webp";
  }, []);

  return (
    <div>
      <Head>
        <title>Sumanitian | Data Science Enthusiast</title>
        <meta
          name="description"
          content="I’m a front-end web developer specializing in building (and occasionally designing) exceptional digital experiences."
        />
        <link rel="icon" href="/fav.png" />
      </Head>

      <Main />
      <About />
      <Skills />
      <EducationTimeline />
      <Projects />
      <Contact />
    </div>
  );
}
