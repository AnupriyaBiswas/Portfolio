import React from "react";
import { PlanetSection } from "./PlanetSection";
import Image from "next/image";
import profilePic from "../public/assets/avatar.png"; // Replace with your actual image

const About = () => {
  return (
    <PlanetSection
      id="about"
      delay={0.2}
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/assets/moon-bg.webp')",
      }}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-10 py-20">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_80px_rgba(168,85,247,0.4)]">
            <Image
              src={profilePic}
              alt="Anupriya Biswas"
              fill
              style={{ objectFit: "cover" }}
              className="hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-white text-4xl font-extrabold mb-4">
            <span className="text-purple-400">About</span> Me
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            I'm <span className="text-white font-semibold">Anupriya Biswas</span>, an AI researcher and full-stack developer with a background in both medicine (MBBS) and computer science (MTech).
          </p>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            I specialize in deep learning, biomedical signal processing, and blockchain. I enjoy exploring futuristic tech and applying it to real-world health & science problems.
          </p>
          <p className="text-purple-100 text-lg leading-relaxed">
            Outside the lab, I jam on the guitar, read sci-fi novels, and play board games under starlit skies.
          </p>
        </div>
      </div>
    </PlanetSection>
  );
};

export default About;
