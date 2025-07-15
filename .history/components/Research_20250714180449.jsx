// D:\Programs\Projects\portfolio\components\Research.jsx
import React from "react";

const researchItems = [
  {
    title: "Optimizing Neural Interfaces for Real-time Processing",
    summary:
      "A deep learning-based approach to improve latency and accuracy in neural interfaces for prosthetic control.",
    link: "https://example.com/research/neural-interfaces",
  },
  {
    title: "Human Gait Analysis using Multimodal Sensors",
    summary:
      "Research focusing on using EMG and IMU data fusion to differentiate gait patterns in Parkinson's disease.",
    link: "https://example.com/research/gait-analysis",
  },
];

const Research = () => {
  return (
    <section
      id="research"
      className="min-h-screen flex flex-col justify-center items-center px-4 md:px-20 py-20 bg-gray-900 text-white"
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center">
        Research
      </h2>
      <div className="grid gap-10 max-w-4xl">
        {researchItems.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 mb-4">{item.summary}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              View Research →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Research;
