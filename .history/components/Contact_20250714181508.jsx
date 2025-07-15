// D:\Programs\Projects\portfolio\components\Contact.jsx
import React from "react";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Contact Me
      </h2>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-xl">
        I'm always open to discussing new projects, creative ideas, or
        opportunities to be part of your visions. Feel free to reach out!
      </p>
      <div className="flex gap-6 mt-4 text-gray-400">
        <a
          href="mailto:youremail@example.com"
          className="hover:text-white transition"
          aria-label="Email"
        >
          <MailIcon size={28} />
        </a>
        <a
          href="https://github.com/yourgithub"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="GitHub"
        >
          <GithubIcon size={28} />
        </a>
        <a
          href="https://linkedin.com/in/yourlinkedin"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={28} />
        </a>
      </div>
    </section>
  );
};

export default Contact;
