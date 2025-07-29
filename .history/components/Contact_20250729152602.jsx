import React from "react";
// Importing specific icons: Mail, Phone, Linkedin, Github, Globe (for Medium)
import { Mail, Phone, Linkedin, Github, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden" // Added relative overflow-hidden for potential background elements
    >
      {/* Optional: Add a subtle background element if desired to enhance theme.
          For example, a faint orange glow or star field, similar to Education section.
          Leaving it out for now to keep it clean, but consider it for theme alignment.
      */}

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
    </section>
  );
};

export default Contact;