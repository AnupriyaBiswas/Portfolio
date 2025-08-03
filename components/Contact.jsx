import React from "react";
import Image from "next/image";
import { Mail, Linkedin, Github, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col transparent text-white relative overflow-hidden"
    >
      {/* Contact Page Background Image (Right Side) */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full opacity-70 z-5" style={{ maxWidth: "40%" }}>
        <Image
          src="/assets/contact.png"
          alt="Contact Page Background Graphic"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main Contact Content */}
      <div className="flex flex-col justify-center items-center flex-grow px-4 md:px-20 py-20 z-10 text-center">
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
    </section>
  );
};

export default Contact;
