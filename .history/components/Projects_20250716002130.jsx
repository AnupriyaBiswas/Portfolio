import React, { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js and Tailwind CSS, showcasing my work and skills.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "https://github.com/nevo/portfolio",
    status: "Live",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    title: "Weather App",
    description:
      "A minimal weather app using the OpenWeatherMap API to display real-time weather updates.",
    tech: ["React", "API", "CSS Modules"],
    link: "https://github.com/nevo/weather-app",
    status: "Completed",
    gradient: "from-green-500 to-emerald-400",
  },
  {
    title: "Blog Platform",
    description:
      "A Markdown-based blogging platform with syntax highlighting, search, and responsive design.",
    tech: ["Next.js", "MDX", "Tailwind"],
    link: "https://github.com/nevo/blog-platform",
    status: "In Progress",
    gradient: "from-purple-500 to-pink-400",
  },
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.8 + 0.2;
      const duration = Math.random() * 15 + 20;
      const delay = Math.random() * duration;
      const left = Math.random() * 100;

      stars.push(
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            opacity: opacity,
            animation: `starFall ${duration}s linear ${delay}s infinite, twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${delay}s, ${Math.random() * 3}s`
          }}
        />
      );
    }
    return stars;
  };

  const generateFloatingParticles = () => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 4 + 2;
      const duration = Math.random() * 20 + 30;
      const delay = Math.random() * duration;
      const left = Math.random() * 100;

      particles.push(
        <div
          key={i}
          className="absolute rounded-full bg-orange-500/20"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            animation: `floatUp ${duration}s linear ${delay}s infinite, pulse ${4 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${delay}s, ${Math.random() * 4}s`
          }}
        />
      );
    }
    return particles;
  };

  return (
    <>
      <style jsx>{`
        @keyframes starFall {
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
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }
        
        @keyframes projectSlideIn {
          0% {
            transform: translateY(100px) rotateX(20deg);
            opacity: 0;
          }
          100% {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes techTagFloat {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        
        @keyframes hologramFlicker {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="projects"
        className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 pointer-events-none">
          {generateStars()}
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {generateFloatingParticles()}
        </div>

        {/* Deep Space Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-purple-900/10 pointer-events-none"></div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl w-full">

          {/* Title */}
          <h2
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-20 text-center transition-all duration-1000 ease-out ${isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
              }`}
            style={{
              transitionDelay: isVisible ? '0.2s' : '0s'
            }}
          >
            <span className="text-orange-500">PROJECT</span>{" "}
            <span className="text-white">SHOWCASE</span>
          </h2>

          {/* Projects Grid */}
          <div className="grid gap-8 md:gap-12 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-1000 ease-out ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: isVisible ? `${0.4 + index * 0.2}s` : '0s',
                  animation: isVisible ? `projectSlideIn 1s ease-out ${0.4 + index * 0.2}s both` : 'none'
                }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Card */}
                <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group-hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">

                  {/* Holographic Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

                  {/* Project Number or Icon */}
                  {index === 2 ? (
                    <img
                      src="assets/fishing.png"
                      alt="Fishing Icon"
                      className="absolute -top-6 -right-6 w-20 h-20 object-contain pointer-events-none z-20"
                      style={{ overflow: 'visible' }}
                    />
                  ) : (
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-gray-900">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  )}


                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${project.status === 'Live' ? 'bg-green-500' :
                        project.status === 'Completed' ? 'bg-blue-500' :
                          'bg-yellow-500'
                      } animate-pulse`}></div>
                    <span className="text-sm font-medium text-gray-300">{project.status}</span>
                  </div>

                  {/* Main Content */}
                  <div className="relative z-10 p-8 pt-16 h-full flex flex-col">

                    {/* Project Title */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-orange-100 transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 flex-grow leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-800/70 text-gray-300 rounded-full text-sm font-medium border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                            style={{
                              animation: hoveredProject === index ? `techTagFloat ${2 + i * 0.2}s ease-in-out infinite` : 'none',
                              animationDelay: `${i * 0.1}s`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center w-full justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 group/button"
                      >
                        <span>Explore Project</span>
                        <svg
                          className="w-5 h-5 ml-2 group-hover/button:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Decorative Corner Elements */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-orange-500/20 rounded-full flex items-center justify-center group-hover:border-orange-500/40 transition-colors duration-300">
                    <div className="w-6 h-6 bg-gradient-to-br from-orange-500/30 to-orange-600/30 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                  </div>

                  {/* Hologram Lines */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" style={{ animation: 'hologramFlicker 2s ease-in-out infinite' }}></div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" style={{ animation: 'hologramFlicker 2s ease-in-out infinite', animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-20 flex justify-center items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-gray-400 text-sm">Scroll to explore more sections</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;