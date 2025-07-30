import React, { useEffect, useState } from "react";
import { Mail, Linkedin, Github, Globe } from "lucide-react"; // Make sure lucide-react is installed: npm install lucide-react

const Contact = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDuration: 25 + Math.random() * 20,
          animationDelay: Math.random() * 10,
          twinkleDuration: 6 + Math.random() * 8,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden"
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `fall ${star.animationDuration}s linear ${star.animationDelay}s infinite, twinkle ${star.twinkleDuration}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* CSS for starfall animation keyframes */}
      <style jsx>{`
        @keyframes fall {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>

      {/* Contact Page Background Image (Right Side) */}
      <img
        src="public/assets/contact.jpg" // Path to your contact image
        alt="Contact Page Background Graphic"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full object-contain opacity-20 z-5" // Adjusted z-index to 5
        style={{ maxWidth: '40%' }} // Limit width to 40% of parent for better visual balance
      />

      {/* Main Contact Content */}
      <div className="flex flex-col justify-center items-center flex-grow px-4 md:px-20 py-20 z-10 text-center">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          <span className="text-orange-500">GET IN</span>{" "}
          <span className="text-white">TOUCH</span>
        </h2>
        <p className="text-gray-300 text-base md:text-lg mt-2 font-light max-w-2xl mx-auto mb-10">
          I'm always open to discussing new projects, creative ideas, or
          opportunities. Feel free to reach out through any of these channels!
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 mt-6">
          {/* Email */}
          <a
            href="mailto:anupriyabiswas2206@gmail.com"
            className="flex flex-col items-center group text-gray-400 hover:text-orange-400 transition-colors duration-300"
            aria-label="Email"
          >
            <Mail size={36} className="mb-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base">Email</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/anupriya-biswas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group text-gray-400 hover:text-orange-400 transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={36} className="mb-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base">LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/AnupriyaBiswas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group text-gray-400 hover:text-orange-400 transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github size={36} className="mb-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base">GitHub</span>
          </a>

          {/* Medium */}
          <a
            href="https://medium.com/@anupriyabiswas2206"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group text-gray-400 hover:text-orange-400 transition-colors duration-300"
            aria-label="Medium"
          >
            <Globe size={36} className="mb-2 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm md:text-base">Medium</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;