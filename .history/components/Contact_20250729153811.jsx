import React, { useEffect, useState } from "react";
// Importing specific icons: Mail, Phone, Linkedin, Github, Globe (for Medium)
import { Mail, Phone, Linkedin, Github, Globe } from "lucide-react";

const Contact = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars for the background animation
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 10,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
    >
      {/* Animated Stars Background - Exact same as Education section */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              // Combined animation and animationDelay into one shorthand property to avoid warnings
              animation: `fall ${25 + Math.random() * 20}s linear ${star.animationDelay}s infinite, twinkle ${6 + Math.random() * 8}s ease-in-out ${star.animationDelay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* CSS for starfall animation keyframes */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh);
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

      {/* Contact Content - z-index to stay above stars */}
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 text-center z-10">
        <span className="text-orange-500">GET IN</span>{" "}
        <span className="text-white">TOUCH</span>
      </h2>
      <p className="text-gray-300 text-base md:text-lg mt-2 font-light max-w-2xl mx-auto text-center mb-10 z-10">
        I'm always open to discussing new projects, creative ideas, or
        opportunities. Feel free to reach out through any of these channels!
      </p>

      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10 mt-6 z-10">
        {/* Email */}
        <a
          href="mailto:anupriyabiswas2206@gmail.com"
          className="flex flex-col items-center group text-gray-400 hover:text-orange-400 transition-colors duration-300"
          aria-label="Email"
        >
          <Mail size={36} className="mb-2 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm md:text-base">Email</span>
        </a>

        {/* Phone Number */}
        <a
          href="tel:+918961353288"
          className="flex flex-col items-center group text-gray-400 hover:text-orange-400 transition-colors duration-300"
          aria-label="Phone Number"
        >
          <Phone size={36} className="mb-2 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm md:text-base">Phone</span>
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


      {/* Footer Image */}
      <div className="w-full mt-16 z-10">
        <img
          src="/assets/footer.png"
          alt="Footer"
          className="w-full object-cover"
        />
      </div>


    </section>
  );
};

export default Contact;