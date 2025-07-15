// D:\Programs\Projects\portfolio\components\About.jsx
import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-black text-white"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        About Me
      </h2>
      <div className="max-w-3xl text-lg md:text-xl text-gray-400 leading-relaxed text-center">
        <p>
          I’m a self-taught frontend developer passionate about design systems,
          animation, and creating intuitive user experiences. With a background
          in computer science and a love for minimalism, I create interfaces
          that feel good to use.
        </p>
        <br />
        <p>
          Outside of coding, I enjoy composing music, watching sci-fi, and
          exploring new design trends.
        </p>
      </div>
    </section>
  );
};

export default About;
