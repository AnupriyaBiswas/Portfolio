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
      <div className="absolute inset-0 overflow-hidden z-20">
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
              animation: `fall ${15 + Math.random() * 10}s linear infinite`,
              animationDelay: `${star.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
          }
          10% {
            transform: translateY(85vh) rotate(1deg);
          }
          20% {
            transform: translateY(70vh) rotate(-0.5deg);
          }
          30% {
            transform: translateY(50vh) rotate(1.5deg);
          }
          40% {
            transform: translateY(35vh) rotate(-1deg);
          }
          50% {
            transform: translateY(20vh) rotate(0.5deg);
          }
          60% {
            transform: translateY(10vh) rotate(-1.5deg);
          }
          70% {
            transform: translateY(-5vh) rotate(1deg);
          }
          80% {
            transform: translateY(-20vh) rotate(-0.5deg);
          }
          92% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(-100vh) rotate(0deg);
          }
        }
      `}</style>

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

      {/* Right Side - Image */}
      <div className="hidden lg:block flex-1 max-w-md z-10 flex justify-end items-end pr-8 pb-16">
        <img 
          src="/assets/with_balloons.png" 
          alt="With Balloons" 
          className="max-w-full object-contain"
          style={{ 
            height: '30vh',
            animation: 'floatUp 30s ease-in-out infinite'
          }}
        />
      </div>

      {/* Vertical Text */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 -rotate-90 text-gray-600 text-sm tracking-wider hidden md:block">
        linkedin.com/in/nevo
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-32 w-1 h-1 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
    </section>
  );
};

export default Hero;