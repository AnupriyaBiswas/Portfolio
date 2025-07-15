import React from "react";
import { PlanetSection } from "./PlanetSection";
import Image from "next/image";
import profilePic from "../public/assets/avatar.jpg"; // Replace with your actual image

const About = () => {
  return (
    <PlanetSection
      id="about"
      delay={0.2}
      className="relative bg-no-repeat bg-center bg-cover"
    >
      {/* Moon Surface Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600">
        {/* Base lunar surface texture */}
        <div className="absolute inset-0 opacity-80" style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(0,0,0,0.3) 2px, transparent 2px),
            radial-gradient(circle at 80% 70%, rgba(0,0,0,0.2) 1px, transparent 1px),
            radial-gradient(circle at 40% 90%, rgba(0,0,0,0.15) 1px, transparent 1px),
            radial-gradient(circle at 60% 10%, rgba(0,0,0,0.25) 1px, transparent 1px),
            radial-gradient(circle at 90% 40%, rgba(0,0,0,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px, 80px 80px, 120px 120px, 90px 90px, 110px 110px'
        }} />
        
        {/* Large craters */}
        <div className="absolute top-[10%] left-[15%] w-40 h-40 rounded-full" style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          boxShadow: 'inset 8px 8px 20px rgba(0,0,0,0.6), inset -8px -8px 20px rgba(255,255,255,0.1)'
        }} />
        
        <div className="absolute top-[25%] right-[20%] w-32 h-32 rounded-full" style={{
          background: 'radial-gradient(circle at 40% 25%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          boxShadow: 'inset 6px 6px 16px rgba(0,0,0,0.5), inset -6px -6px 16px rgba(255,255,255,0.08)'
        }} />
        
        <div className="absolute bottom-[15%] left-[25%] w-48 h-48 rounded-full" style={{
          background: 'radial-gradient(circle at 35% 40%, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)',
          boxShadow: 'inset 10px 10px 25px rgba(0,0,0,0.7), inset -10px -10px 25px rgba(255,255,255,0.12)'
        }} />
        
        <div className="absolute bottom-[30%] right-[10%] w-36 h-36 rounded-full" style={{
          background: 'radial-gradient(circle at 25% 35%, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)',
          boxShadow: 'inset 7px 7px 18px rgba(0,0,0,0.6), inset -7px -7px 18px rgba(255,255,255,0.1)'
        }} />
        
        {/* Medium craters */}
        <div className="absolute top-[45%] left-[10%] w-20 h-20 rounded-full" style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
          boxShadow: 'inset 4px 4px 12px rgba(0,0,0,0.4), inset -4px -4px 12px rgba(255,255,255,0.06)'
        }} />
        
        <div className="absolute top-[60%] right-[30%] w-24 h-24 rounded-full" style={{
          background: 'radial-gradient(circle at 40% 20%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 65%, transparent 100%)',
          boxShadow: 'inset 5px 5px 14px rgba(0,0,0,0.5), inset -5px -5px 14px rgba(255,255,255,0.07)'
        }} />
        
        <div className="absolute top-[70%] left-[45%] w-16 h-16 rounded-full" style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)',
          boxShadow: 'inset 3px 3px 10px rgba(0,0,0,0.4), inset -3px -3px 10px rgba(255,255,255,0.05)'
        }} />
        
        <div className="absolute bottom-[45%] right-[45%] w-18 h-18 rounded-full" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 70%, transparent 100%)',
          boxShadow: 'inset 4px 4px 11px rgba(0,0,0,0.45), inset -4px -4px 11px rgba(255,255,255,0.06)'
        }} />
        
        {/* Small craters */}
        <div className="absolute top-[35%] left-[60%] w-12 h-12 rounded-full" style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 80%, transparent 100%)',
          boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.3), inset -2px -2px 8px rgba(255,255,255,0.04)'
        }} />
        
        <div className="absolute top-[50%] right-[60%] w-10 h-10 rounded-full" style={{
          background: 'radial-gradient(circle at 40% 25%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 85%, transparent 100%)',
          boxShadow: 'inset 2px 2px 7px rgba(0,0,0,0.35), inset -2px -2px 7px rgba(255,255,255,0.03)'
        }} />
        
        <div className="absolute bottom-[60%] left-[70%] w-8 h-8 rounded-full" style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 90%, transparent 100%)',
          boxShadow: 'inset 1px 1px 6px rgba(0,0,0,0.3), inset -1px -1px 6px rgba(255,255,255,0.02)'
        }} />
        
        <div className="absolute top-[80%] right-[70%] w-14 h-14 rounded-full" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 85%, transparent 100%)',
          boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.3), inset -2px -2px 8px rgba(255,255,255,0.03)'
        }} />
        
        {/* Tiny craters for fine detail */}
        <div className="absolute top-[20%] left-[40%] w-6 h-6 rounded-full" style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.08) 90%, transparent 100%)',
          boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.25)'
        }} />
        
        <div className="absolute top-[55%] left-[80%] w-4 h-4 rounded-full" style={{
          background: 'radial-gradient(circle at 40% 25%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.06) 95%, transparent 100%)',
          boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)'
        }} />
        
        <div className="absolute bottom-[25%] right-[65%] w-5 h-5 rounded-full" style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.07) 92%, transparent 100%)',
          boxShadow: 'inset 1px 1px 4px rgba(0,0,0,0.22)'
        }} />
        
        <div className="absolute top-[75%] left-[30%] w-3 h-3 rounded-full" style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 95%, transparent 100%)',
          boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.18)'
        }} />
        
        {/* Surface roughness overlay */}
        <div className="absolute inset-0 opacity-60" style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 30% 80%, rgba(0,0,0,0.05) 1px, transparent 1px),
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.01) 1px, transparent 1px),
            radial-gradient(circle at 90% 90%, rgba(0,0,0,0.03) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px, 25px 25px, 35px 35px, 28px 28px, 32px 32px'
        }} />
        
        {/* Directional lighting */}
        <div className="absolute inset-0 opacity-40" style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)'
        }} />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 w-full max-w-6xl px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-10 py-20">
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_80px_rgba(168,85,247,0.4)]">
            <Image
              src={profilePic}
              alt="Anupriya Biswas"
              fill
              style={{ objectFit: "cover" }}
              className="hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-white text-4xl font-extrabold mb-4">
            <span className="text-purple-400">About</span> Me
          </h2>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            I'm <span className="text-white font-semibold">Anupriya Biswas</span>, an AI researcher and full-stack developer with a background in both medicine (MBBS) and computer science (MTech).
          </p>
          <p className="text-purple-100 text-lg leading-relaxed mb-4">
            I specialize in deep learning, biomedical signal processing, and blockchain. I enjoy exploring futuristic tech and applying it to real-world health & science problems.
          </p>
          <p className="text-purple-100 text-lg leading-relaxed">
            Outside the lab, I jam on the guitar, read sci-fi novels, and play board games under starlit skies.
          </p>
        </div>
      </div>
    </PlanetSection>
  );
};

export default About;