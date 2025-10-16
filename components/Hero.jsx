import React, { useState, useEffect } from "react";
import Image from "next/image";

// keep roles outside so useEffect dependencies are stable
const roles = ["AI/ML Developer", "Software Developer"];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 100 : 150;
    const timeout = setTimeout(() => {
      const currentText = roles[roleIndex];

      if (!isDeleting && charIndex < currentText.length) {
        setCurrentRole(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentRole(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const [firstWord, secondWord] = currentRole.includes(" ")
    ? currentRole.split(" ")
    : [currentRole, ""];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-between px-4 md:px-16 transparent text-white relative overflow-hidden"
    >
      {/* Hamburger Menu
      <div className="absolute top-6 right-6 z-50">
        <button className="flex flex-col space-y-1 cursor-pointer">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div> */}

      {/* Left Side - Main Content */}
      <div className="flex-1 max-w-3xl z-10">
        <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
          <span className="inline-block min-w-[18ch]">
            {/* First word (orange) */}
            <span className="block text-orange-500">
              {firstWord || (roleIndex === 0 ? "AI/ML" : "Software")}
            </span>
            {/* Second word (white) with placeholder */}
            <span className="block text-white">
              {secondWord || <span className="invisible">Developer</span>}
            </span>
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg md:text-xl mb-8 max-w-sm sm:max-w-md md:max-w-2xl leading-relaxed break-words">
          Hello, I&apos;m{" "}
          <span className="text-orange-400 font-bold">Anupriya Biswas</span>, a Student of Computer Science
          Engineering. I have worked as a Front-end Developer. I&apos;m
          passionate about Deep Learning Solutions to real-world Problems.
          Welcome to my World!
        </p>


        <button
          onClick={() => window.open("/assets/Resume.pdf", "_blank")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-none font-semibold text-lg tracking-wider transition-colors duration-300"
        >
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
