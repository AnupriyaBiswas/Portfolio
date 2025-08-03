import React, { useState, useEffect } from "react";
import Image from "next/image";

// ✅ fix roles placement
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
  }, [charIndex, isDeleting, roleIndex]); // ✅ no roles in deps

  const [firstWord, secondWord] = currentRole.includes(" ")
    ? currentRole.split(" ")
    : [currentRole, ""];

  return (
    <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
      <span className="inline-block min-w-[18ch]">
        <span className="block text-orange-500">
          {firstWord || (roleIndex === 0 ? "AI/ML" : "Software")}
        </span>
        <span className="block text-white">
          {secondWord || <span className="invisible">Developer</span>}
        </span>
      </span>
      <span className="blinking-cursor">|</span>
      <style jsx>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 2rem;
          color: orange;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </h1>
  );
};

export default Hero;
