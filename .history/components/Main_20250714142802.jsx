import React from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { BackgroundBeamsWithCollision } from "./BackgroundBeamsWithCollision";

// Update your real details here:
const name = "Anupriya Biswas";
const tagline = "AI Researcher | Web Developer";
const description =
  "Computer Science engineer with a passion for research in Deep Learning, Blockchain, and Web Development. Currently exploring Depp-Learning Models and Architectures.";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/anupriya-biswas",
    icon: Linkedin,
  },
  {
    href: "https://github.com/anupriya-biswas",
    icon: Github,
  },
  {
    href: "mailto:anupriyabiswas2206@gmail.com",
    icon: Mail,
  },
  {
    href: "/assets/Anupriya_Biswas_CV.pdf",
    icon: FileText,
  },
];

const SocialIcon = ({ href, icon: Icon, delay = 0 }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group relative transform transition-all duration-300 hover:scale-105"
    style={{
      animationDelay: `${delay}ms`,
    }}
  >
    <div className="relative rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-purple-500/30 p-6 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:shadow-purple-500/40 hover:border-purple-300/50">
      <Icon className="text-white group-hover:text-purple-400 transition-colors duration-300 text-xl" />
    </div>
  </a>
);

const Main = () => {
  return (
    <div id="home" className="w-full">
      <BackgroundBeamsWithCollision>
        <div className="relative z-10 max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
          <div className="text-center">
            <h1 className="py-4 text-4xl md:text-5xl lg:text-6xl font-bold text-white animate-fade-in">
              Hi, this is {" "}
              <span className="text-purple-400 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>

            <h3 className="py-2 text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-200 animate-fade-in-delay-1">
              {tagline}
            </h3>

            <p className="py-4 text-gray-300 sm:max-w-[70%] m-auto text-base leading-relaxed animate-fade-in-delay-2">
              {description}
            </p>

            <div className="flex items-center justify-center gap-6 max-w-[330px] m-auto py-8 animate-fade-in-delay-3">
              {socialLinks.map((link, i) => (
                <SocialIcon
                  key={i}
                  href={link.href}
                  icon={link.icon}
                  delay={1000 + i * 200}
                />
              ))}
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-1 {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease-out 0.8s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Main;
