import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GithHubImg from '../public/assets/githubprofile.jpeg';

const About = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div id='about' className='w-full md:h-screen p-2 flex items-center py-16 relative overflow-hidden bg-black'>
      {/* Spotlight Effects */}
      <div className='pointer-events-none absolute inset-0 h-full w-full'>
        {/* Left Spotlights */}
        <div className='absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none animate-spotlight-left'>
          <div
            className='absolute top-0 left-0'
            style={{
              transform: 'translateY(-350px) rotate(-45deg)',
              background:
                'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .12) 0, hsla(210, 100%, 55%, .04) 50%, hsla(210, 100%, 45%, 0) 80%)',
              width: '560px',
              height: '1380px',
            }}
          />
          <div
            className='absolute top-0 left-0 origin-top-left'
            style={{
              transform: 'rotate(-45deg) translate(5%, -50%)',
              background:
                'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .03) 80%, transparent 100%)',
              width: '240px',
              height: '1380px',
            }}
          />
          <div
            className='absolute top-0 left-0 origin-top-left'
            style={{
              transform: 'rotate(-45deg) translate(-180%, -70%)',
              background:
                'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 45%, .03) 80%, transparent 100%)',
              width: '240px',
              height: '1380px',
            }}
          />
        </div>

        {/* Right Spotlights */}
        <div className='absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none animate-spotlight-right'>
          <div
            className='absolute top-0 right-0'
            style={{
              transform: 'translateY(-350px) rotate(45deg)',
              background:
                'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .12) 0, hsla(210, 100%, 55%, .04) 50%, hsla(210, 100%, 45%, 0) 80%)',
              width: '560px',
              height: '1380px',
            }}
          />
          <div
            className='absolute top-0 right-0 origin-top-right'
            style={{
              transform: 'rotate(45deg) translate(-5%, -50%)',
              background:
                'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .03) 80%, transparent 100%)',
              width: '240px',
              height: '1380px',
            }}
          />
          <div
            className='absolute top-0 right-0 origin-top-right'
            style={{
              transform: 'rotate(45deg) translate(180%, -70%)',
              background:
                'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 45%, .03) 80%, transparent 100%)',
              width: '240px',
              height: '1380px',
            }}
          />
        </div>

        {/* Center Glow */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none animate-pulse-slow'>
          <div
            className='rounded-full'
            style={{
              background:
                'radial-gradient(circle, hsla(210, 100%, 85%, .04) 0%, hsla(210, 100%, 55%, .015) 50%, transparent 80%)',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-[1240px] m-auto md:grid grid-cols-3 gap-8 relative z-10'>
        <div className='col-span-2'>
          <p className='uppercase text-xl tracking-widest text-[#5651e5]'>About</p>
          <h2 className='py-4 text-white text-4xl font-bold'>Who I Am</h2>
          <p className='py-2 text-gray-300 leading-relaxed'>
            I&#39;m a dedicated and curious engineer with a strong passion for building technology
            that makes a difference. My journey in tech began with a deep interest in web
            development, which has grown into hands-on experience in full-stack development using
            modern frameworks and best practices.
            <br />
            In addition to web development, I actively explore the fields of Web3 and cybersecurity.
            I enjoy learning about blockchain technologies, smart contracts, and decentralized
            applications—constantly seeking new ways to apply them in real-world scenarios. I
            believe in continuous learning, clean code, and solving real problems with thoughtful
            design and secure solutions.
          </p>
          <Link href='/#projects'>
            <p className='py-2 text-gray-300 underline cursor-pointer hover:text-white transition-colors duration-300'>
              Check out some of my latest projects.
            </p>
          </Link>
        </div>
        
        {/* Image Section with Enhanced Design */}
        <div className='w-full h-auto m-auto flex items-center justify-center p-6 relative group'>
          {/* Outer Glow Ring */}
          <div className='absolute inset-0 rounded-full animate-slow-spin opacity-30 group-hover:opacity-60 transition-all duration-700'
               style={{
                 background: 'conic-gradient(from 0deg, #00ccb1, #7b61ff, #ffc414, #1ca0fb, #00ccb1)',
                 padding: '3px',
                 filter: 'blur(8px)'
               }}
          />
          
          {/* Animated Gradient Border */}
          <div className='absolute inset-2 rounded-3xl z-[1] opacity-70 group-hover:opacity-100 blur-xl transition-all duration-500 animate-gradient-bg'
               style={{
                 background: 'radial-gradient(circle farthest-side at 0 100%, #00ccb1, transparent), radial-gradient(circle farthest-side at 100% 0, #7b61ff, transparent), radial-gradient(circle farthest-side at 100% 100%, #ffc414, transparent), radial-gradient(circle farthest-side at 0 0, #1ca0fb, #141316)',
                 backgroundSize: '400% 400%',
                 padding: '4px'
               }}
          />
          
          {/* Sharp Gradient Border */}
          <div className='absolute inset-2 rounded-3xl z-[2] animate-gradient-bg'
               style={{
                 background: 'radial-gradient(circle farthest-side at 0 100%, #00ccb1, transparent), radial-gradient(circle farthest-side at 100% 0, #7b61ff, transparent), radial-gradient(circle farthest-side at 100% 100%, #ffc414, transparent), radial-gradient(circle farthest-side at 0 0, #1ca0fb, #141316)',
                 backgroundSize: '400% 400%',
                 padding: '2px'
               }}
          />
          
          {/* Inner Shadow Ring */}
          <div className='absolute inset-4 rounded-3xl z-[3] bg-black/20 blur-sm animate-pulse-glow'></div>
          
          {/* Image Container with Enhanced Effects */}
          <div className='relative z-10 rounded-2xl overflow-hidden transform transition-all duration-700 group-hover:scale-105 group-hover:rotate-1 shadow-2xl'>
            {/* Image Overlay Effects */}
            <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none'></div>
            
            {/* Reflection Effect */}
            <div className='absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none'></div>
            
            {/* Main Image */}
            <div className='relative overflow-hidden rounded-2xl'>
              <Image 
                src={GithHubImg} 
                className='rounded-2xl transition-all duration-700 group-hover:brightness-110 group-hover:contrast-105' 
                alt='GitHub Profile Image' 
              />
            </div>
            
            {/* Floating Particles */}
            <div className='absolute inset-0 pointer-events-none'>
              <div className='absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-float-1 opacity-0 group-hover:opacity-80'></div>
              <div className='absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-float-2 opacity-0 group-hover:opacity-80'></div>
              <div className='absolute bottom-1/4 left-3/4 w-1 h-1 bg-yellow-400 rounded-full animate-float-3 opacity-0 group-hover:opacity-80'></div>
              <div className='absolute top-1/2 right-1/2 w-1 h-1 bg-blue-400 rounded-full animate-float-4 opacity-0 group-hover:opacity-80'></div>
            </div>
          </div>
          
          {/* Ambient Light Effect */}
          <div className='absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse-slow'
               style={{
                 background: 'radial-gradient(circle, rgba(123, 97, 255, 0.3) 0%, transparent 70%)',
                 filter: 'blur(20px)'
               }}
          />
        </div>
      </div>

      {/* Scoped CSS for animations */}
      <style jsx>{`
        @keyframes spotlight-left {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(100px);
          }
        }

        @keyframes spotlight-right {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-100px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes gradient-bg {
          0% {
            background-position: 0 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0 50%;
          }
        }

        @keyframes slow-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }

        @keyframes float-1 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-3px);
          }
        }

        @keyframes float-2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(8px) translateX(-7px);
          }
          66% {
            transform: translateY(-6px) translateX(4px);
          }
        }

        @keyframes float-3 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-12px) translateX(-2px);
          }
          66% {
            transform: translateY(7px) translateX(6px);
          }
        }

        @keyframes float-4 {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(6px) translateX(8px);
          }
          66% {
            transform: translateY(-9px) translateX(-5px);
          }
        }

        .animate-spotlight-left {
          animation: spotlight-left 7s ease-in-out infinite;
        }

        .animate-spotlight-right {
          animation: spotlight-right 7s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-gradient-bg {
          animation: gradient-bg 5s ease infinite;
        }

        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animate-float-1 {
          animation: float-1 6s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 7s ease-in-out infinite;
        }

        .animate-float-3 {
          animation: float-3 8s ease-in-out infinite;
        }

        .animate-float-4 {
          animation: float-4 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;