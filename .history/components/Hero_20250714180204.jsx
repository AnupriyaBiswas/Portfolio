// D:\Programs\Projects\portfolio\components\Hero.jsx
import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-10 text-center bg-gradient-to-b from-black to-gray-900"
    >
      <div className="w-32 h-32 mb-6">
        <Image
          src="/assets/avatar.png"
          alt="Profile"
          width={128}
          height={128}
          className="rounded-full border-2 border-white object-cover"
          priority
        />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold">Hi, I’m Nevo</h1>
      <p className="text-xl md:text-2xl text-gray-400 mt-4">
        Frontend Developer · Creative Engineer · Dreamer
      </p>
      <p className="mt-8 text-md max-w-xl text-gray-400">
        I build clean, functional, and creative web experiences with attention
        to detail, performance, and user experience.
      </p>
    </section>
  );
};

export default Hero;
