import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 transparent text-white relative overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl w-full">
        {/* Heading */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 text-left">
          <span className="text-orange-500">ABOUT</span>{" "}
          <span className="text-white">ME</span>
        </h2>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed text-left">
              I&apos;m a{" "}
              <span className="text-orange-500 font-semibold">
                Creative and Curious
              </span>{" "}
              Technology enthusiast, with a masters in Computer Engineering. As a passion and profession, I like exploring the intersection of software development and AI/ML (Blockchain Technologies being a bit of a Guilty Pleasure).
            </p>

            <p className="text-lg md:text-xl text-gray-400 leading-relaxed text-left">
              Currently, I&apos;m working on{" "}
              <span className="text-orange-500 font-semibold">
                Multimodal Gait Analysis
              </span>{" "}
              using Signal Processing, aiming to bridge advanced research with practical, real-world solutions.
            </p>

            {/* Decorative elements */}
            <div className="flex items-center mt-6">
              <div className="w-16 h-0.5 bg-orange-500 mr-4"></div>
              <div className="w-8 h-0.5 bg-white mr-4"></div>
              <div className="w-4 h-0.5 bg-orange-500/60"></div>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Image
                src="/assets/about.jpg"
                alt="About me"
                width={320}
                height={320}
                className="w-80 h-80 lg:w-100 lg:h-100 object-cover rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-20 flex items-center justify-center lg:justify-start"></div>
      </div>
    </section>
  );
};

export default About;
