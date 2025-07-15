import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  // Generate stars for background animation
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const size = Math.random() * 3 + 1; // 1-4px
      const opacity = Math.random() * 0.8 + 0.2; // 0.2-1.0
      const duration = Math.random() * 10 + 15; // 15-25 seconds
      const delay = Math.random() * duration;
      const left = Math.random() * 100;
      
      stars.push(
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            opacity: opacity,
            animation: `starFall ${duration}s linear ${delay}s infinite, twinkle 3s ease-in-out infinite`,
            animationDelay: `${delay}s, ${Math.random() * 3}s`
          }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <style jsx>{`
        @keyframes starFall {
          0% {
            transform: translateY(-100vh);
          }
          100% {
            transform: translateY(100vh);
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
      `}</style>
      
      <section
        ref={sectionRef}
        id="about"
        className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 pointer-events-none">
          {generateStars()}
        </div>

        <div className="relative z-10 max-w-6xl w-full">
          {/* Animated heading */}
          <h2 
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-16 text-left transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? '0.2s' : '0s'
            }}
          >
            <span className="text-orange-500">ABOUT</span>{' '}
            <span className="text-white">ME</span>
          </h2>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text content */}
            <div className="space-y-8">
              <p 
                className={`text-lg md:text-xl text-gray-400 leading-relaxed text-left transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? '0.4s' : '0s'
                }}
              >
                I'm a self-taught <span className="text-orange-500 font-semibold">frontend developer</span> passionate about design systems,
                animation, and creating intuitive user experiences. With a background
                in computer science and a love for minimalism, I create interfaces
                that feel good to use.
              </p>

              <p 
                className={`text-lg md:text-xl text-gray-400 leading-relaxed text-left transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? '0.6s' : '0s'
                }}
              >
                Outside of coding, I enjoy composing music, watching sci-fi, and
                exploring new <span className="text-orange-500 font-semibold">design trends</span>. I believe that great
                software is built with attention to detail and user empathy.
              </p>

              {/* Skills/Technologies */}
              <div 
                className={`transition-all duration-1000 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isVisible ? '0.8s' : '0s'
                }}
              >
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js'].map((tech, index) => (
                    <span 
                      key={tech}
                      className="px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg text-orange-500 text-sm font-medium hover:bg-orange-500/20 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div 
              className={`flex justify-center lg:justify-end transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: isVisible ? '1.0s' : '0s'
              }}
            >
              <div className="relative group">
                <img
                  src="/assets/about.jpg"
                  alt="About me"
                  className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-lg shadow-2xl border-2 border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300"
                />
                {/* Orange glow effect */}
                <div className="absolute inset-0 bg-orange-500/5 rounded-lg group-hover:bg-orange-500/10 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          {/* Animated decorative elements */}
          <div className="mt-20 flex items-center justify-center lg:justify-start">
            <div 
              className={`w-16 h-0.5 bg-orange-500 mr-4 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '1.2s' : '0s'
              }}
            ></div>
            <div 
              className={`w-8 h-0.5 bg-white mr-4 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '1.4s' : '0s'
              }}
            ></div>
            <div 
              className={`w-4 h-0.5 bg-orange-500/60 transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 scale-x-100' 
                  : 'opacity-0 scale-x-0'
              }`}
              style={{
                transitionDelay: isVisible ? '1.6s' : '0s'
              }}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;