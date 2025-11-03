import React from "react";
import Image from "next/image";
import { Mail, Linkedin, Github, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col transparent text-white relative overflow-hidden"
    >
      {/* Container for UFO and Light - they move together */}
      <div 
        className="absolute top-8 left-1/2 z-20"
        style={{
          transform: 'translateX(-50%)',
          animation: 'ufoSway 4s ease-in-out infinite alternate'
        }}
      >
        {/* UFO Image */}
        <div className="w-24 h-24 md:w-32 md:h-32 relative mx-auto">
          <Image
            src="/assets/UFO.png"
            alt="UFO"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Light source point directly below UFO */}
        <div 
          className="absolute left-1/2 opacity-60"
          style={{
            top: '80px',
            width: '5px',
            height: '5px',
            background: `
              radial-gradient(circle,
                rgba(251, 146, 60, 1) 0%,
                rgba(251, 146, 60, 0.6) 50%,
                transparent 100%
              )
            `,
            filter: 'blur(3px)',
            transform: 'translateX(-50%)',
            animation: 'sourcePulse 2s ease-in-out infinite'
          }}
        />

        {/* Main spotlight cone */}
        <div 
          className="absolute opacity-50"
          style={{
            top: '90px',
            left: '50%',
            width: '1000px',
            height: '700px',
            background: `
              conic-gradient(from 90deg at 50% 0%,
                transparent 0deg,
                transparent 40deg,
                rgba(237, 181, 113, 0.1) 60deg,
                rgba(251, 146, 60, 0.3) 75deg,
                rgba(251, 146, 60, 0.3) 85deg,
                rgba(251, 146, 60, 0.3) 90deg,
                rgba(251, 146, 60, 0.3) 95deg,
                rgba(251, 146, 60, 0.3) 105deg,
                rgba(237, 181, 113, 0.1) 120deg,
                transparent 140deg,
                transparent 360deg
              )
            `,
            transform: 'translateX(-50%) rotate(0deg)',
            transformOrigin: 'top center',
            filter: 'blur(3px)',
            animation: 'spotlightSweep 4s ease-in-out infinite alternate'
          }}
        />
        
        {/* Secondary glow layer - also attached */}
        <div 
          className="absolute opacity-30"
          style={{
            top: '90px',
            left: '50%',
            width: '600px',
            height: '800px',
            background: `
              conic-gradient(from 90deg at 50% 0%,
                transparent 0deg,
                transparent 65deg,
                rgba(251, 146, 60, 0.05) 70deg,
                rgba(251, 146, 60, 0.15) 80deg,
                rgba(251, 146, 60, 0.25) 90deg,
                rgba(251, 146, 60, 0.15) 100deg,
                rgba(251, 146, 60, 0.05) 110deg,
                transparent 115deg,
                transparent 360deg
              )
            `,
            filter: 'blur(5px)',
            transform: 'translateX(-50%) rotate(0deg)',
            transformOrigin: 'top center',
            animation: 'spotlightSweep 4s ease-in-out infinite alternate 0.5s'
          }}
        />
      </div>

      {/* Contact Page Background Image (Right Side) */}
      <div className="absolute right-0 top-0 h-full w-1/3 md:w-2/5 z-5">
        <Image
          src="/assets/contact.png"
          alt="Contact Page Background Graphic"
          fill
          className="object-contain object-right"
          priority
        />
      </div>

      {/* Main Contact Content - Positioned in the limelight */}
      <div className="flex flex-col justify-center items-center flex-grow px-4 md:px-20 py-20 z-15 text-center mt-32 md:mt-40">
        
        {/* Content within the limelight cone */}
        <div className="relative z-15 max-w-4xl">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="text-orange-500">GET IN</span>{" "}
            <span className="text-white">TOUCH</span>
          </h2>
          <p className="text-gray-300 text-base md:text-lg mt-2 font-light max-w-2xl mx-auto mb-10">
            I&apos;m always open to discussing new projects, creative ideas, or
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
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes ufoSway {
          0% {
            transform: translateX(-50%) rotate(-2deg) translateX(-15px);
          }
          100% {
            transform: translateX(-50%) rotate(2deg) translateX(15px);
          }
        }
        
        @keyframes spotlightSweep {
          0% {
            transform: translateX(-50%) rotate(-3deg);
          }
          100% {
            transform: translateX(-50%) rotate(3deg);
          }
        }
        
        @keyframes sourcePulse {
          0%, 100% {
            opacity: 0.6;
            transform: translateX(-50%) scale(1);
          }
          50% {
            opacity: 0.9;
            transform: translateX(-50%) scale(1.3);
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
