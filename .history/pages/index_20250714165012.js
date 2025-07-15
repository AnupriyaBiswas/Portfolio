import Head from 'next/head'
const About = dynamic(() => import('../components/About'), {
  loading: () => <div className="text-white text-center py-10">Loading About...</div>,
  ssr: false,
});

import Contact from '../components/Contact'
import Main from '../components/Main'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import EducationTimeline from '../components/EducationTimeline'


import dynamic from "next/dynamic";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Sumanitian | Data Science Enthusiast</title>
        <meta name="description" content="I’m a front-end web developer specializing in building (and occasionally designing) exceptional digital experiences." />
        <link rel="icon" href="/fav.png" />
      </Head>
    <Main />
    <About />
    <Skills />
    <EducationTimeline />
    <Projects />
    <Contact />
    
 
    </div>
  )
}
