import React, { useEffect, useState } from "react";

const Hero = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 3,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-between px-4 md:px-16 bg-black text-white relative overflow-hidden"
    >
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Hamburger Menu */}
      <div className="absolute top-6 right-6 z-50">
        <button className="flex flex-col space-y-1 cursor-pointer">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Left Side - Main Content */}
      <div className="flex-1 max-w-3xl z-10">
        <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8">
          <span className="text-orange-500">FRONTEND</span>
          <br />
          <span className="text-white">DEVELOPER</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl leading-relaxed">
          Hi I'm Ahmed also known as NEVO. A Frontend Developer with
          hands-on experience through building high-performance, scalable,
          and responsive web solutions.
        </p>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-none font-semibold text-lg tracking-wider transition-colors duration-300">
          RESUME
        </button>
      </div>

      {/* Right Side - Code Snippet */}
      <div className="hidden lg:block flex-1 max-w-md z-10">
        <div className="bg-black/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 font-mono text-sm">
          <div className="text-orange-400 mb-2">&lt;span&gt;</div>
          <div className="text-gray-300 leading-relaxed pl-4">
            Proficient in the latest web technologies and
            frameworks, continuously expanding my skill set
            to stay at the forefront of the industry.
          </div>
          <div className="text-orange-400 mt-2">&lt;/span&gt;</div>
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