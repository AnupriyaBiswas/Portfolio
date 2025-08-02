import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-between px-4 md:px-16 transparent text-white relative overflow-hidden"
    >
      {/* Hamburger Menu */}
      <div className="absolute top-6 right-6 z-50">
        <button className="flex flex-col space-y-1 cursor-pointer">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Left Side - Main Content */}
      <div className="flex-1 max-w-3xl z-10">
        <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
          <span className="text-orange-500">AI/ML</span>
          <br />
          <span className="text-white">DEVELOPER</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
          Hello, I&apos;m Anupriya Biswas, a Student of Computer Science
          Engineering. I have worked as a Front-end Developer. I&apos;m
          passionate about Deep Learning Solutions to real-world Problems.
          Welcome to my World!
        </p>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-none font-semibold text-lg tracking-wider transition-colors duration-300">
          My Resume
        </button>
      </div>

      {/* Right Side - Floating Image */}
      <div className="hidden lg:block flex-1 max-w-md z-10 flex justify-end items-end pr-0 pb-16">
        <div className="relative w-full h-[50vh] animate-floatUp">
          <Image
            src="/assets/with_balloons.png"
            alt="With Balloons"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-32 w-1 h-1 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
    </section>
  );
};

export default Hero;
