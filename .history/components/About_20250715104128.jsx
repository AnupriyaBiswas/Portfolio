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

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl">
        {/* Animated heading */}
        <h2 
          className={`text-4xl md:text-6xl font-bold mb-16 text-center transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: isVisible ? '0.2s' : '0s'
          }}
        >
          About Me
        </h2>

        {/* Animated content container */}
        <div className="space-y-8">
          <p 
            className={`text-lg md:text-xl text-gray-300 leading-relaxed text-center transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? '0.4s' : '0s'
            }}
          >
            I'm a self-taught frontend developer passionate about design systems,
            animation, and creating intuitive user experiences. With a background
            in computer science and a love for minimalism, I create interfaces
            that feel good to use.
          </p>

          <p 
            className={`text-lg md:text-xl text-gray-300 leading-relaxed text-center transition-all duration-1000 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: isVisible ? '0.6s' : '0s'
            }}
          >
            Outside of coding, I enjoy composing music, watching sci-fi, and
            exploring new design trends.
          </p>
        </div>

        {/* Animated decorative line */}
        <div 
          className={`w-24 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-12 transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-60 scale-x-100' 
              : 'opacity-0 scale-x-0'
          }`}
          style={{
            transitionDelay: isVisible ? '0.8s' : '0s'
          }}
        ></div>
      </div>

      {/* Subtle floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full transition-all duration-2000 ease-out ${
              isVisible ? 'opacity-20' : 'opacity-0'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              transitionDelay: isVisible ? `${1 + i * 0.1}s` : '0s'
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default About;