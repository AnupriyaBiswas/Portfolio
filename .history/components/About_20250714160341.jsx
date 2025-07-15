import React from "react";
import { PlanetSection } from "./PlanetSection";

const About = () => {
  return (
    <PlanetSection id="about" delay={0.2} className="bg-transparent">
      <div className="max-w-3xl text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-6">🌌 About Me</h2>
        <p className="text-lg text-purple-200 leading-relaxed mb-4">
          I'm Anupriya Biswas — a passionate AI researcher and web developer.
          With a dual foundation in Medicine (MBBS) and Computer Science (MTech),
          I explore the intersection of healthcare and technology.
        </p>
        <p className="text-lg text-purple-200 leading-relaxed mb-4">
          My focus lies in designing deep learning architectures for real-world
          impact, fusing domains like computer vision, biomedical signal processing,
          and blockchain-based systems.
        </p>
        <p className="text-lg text-purple-200 leading-relaxed">
          When I’m not coding or researching, you’ll find me strumming my guitar,
          playing strategic board games, or diving into sci-fi books under the stars.
        </p>
      </div>
    </PlanetSection>
  );
};

export default About;
