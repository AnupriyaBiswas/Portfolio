import React, { useEffect, useState } from "react";

const About = () => {
  // State for stars, no longer using isVisible for content animation
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate random stars to match the Hero component's animation
    const generatedStars = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.8 + 0.2;
      const duration = Math.random() * 10 + 15; // Duration for the fall animation
      const animationDelay = Math.random() * 3; // Delay for the fall animation to start

      generatedStars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white" // Removed animate-pulse
          style={{
            left: `${Math.random() * 100}%`, // X position
            top: `${Math.random() * 100}%`,  // Y position (initial, then falls)
            width: `${size}px`,
            height: `${size}px`,
            opacity: opacity,
            // Combined animation for falling stars, matching Hero component
            animation: `fall ${duration}s linear infinite`,
            animationDelay: `${animationDelay}s`,
          }}
        />
      );
    }
    setStars(generatedStars);
  }, []);

  return (
    <>
      <style jsx>{`
        /* Keyframe animation for falling stars, renamed to 'fall' */
        @keyframes fall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        /* Removed @keyframes twinkle as per request */
      `}</style>

      <section
        id="about"
        className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 pointer-events-none">
          {stars}
        </div>

        <div className="relative z-10 max-w-6xl w-full">
          {/* Heading - removed float-in animation classes and styles */}
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-16 text-left"
          >
            <span className="text-orange-500">ABOUT</span>{" "}
            <span className="text-white">ME</span>
          </h2>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text content - removed float-in animation classes and styles */}
            <div className="space-y-8">
              <p
                className="text-lg md:text-xl text-gray-400 leading-relaxed text-left"
              >
                I'm a self-taught <span className="text-orange-500 font-semibold">frontend developer</span> passionate about design systems,
                animation, and creating intuitive user experiences. With a background
                in computer science and a love for minimalism, I create interfaces
                that feel good to use.
              </p>

              <p
                className="text-lg md:text-xl text-gray-400 leading-relaxed text-left"
              >
                Outside of coding, I enjoy composing music, watching sci-fi, and
                exploring new <span className="text-orange-500 font-semibold">design trends</span>. I believe that great
                software is built with attention to detail and user empathy.
              </p>

              {/* Animated decorative elements - removed float-in animation classes and styles */}
              <div className="flex items-center mt-6">
                <div
                  className="w-16 h-0.5 bg-orange-500 mr-4"
                ></div>
                <div
                  className="w-8 h-0.5 bg-white mr-4"
                ></div>
                <div
                  className="w-4 h-0.5 bg-orange-500/60"
                ></div>
              </div>
            </div>

            {/* Image - removed float-in animation classes and styles */}
            <div
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <img
                  src="/assets/about.jpg"
                  alt="About me"
                  className="w-80 h-80 lg:w-100 lg:h-100 object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Animated decorative elements */}
          <div className="mt-20 flex items-center justify-center lg:justify-start"></div>
        </div>
      </section>
    </>
  );
};

export default About;
