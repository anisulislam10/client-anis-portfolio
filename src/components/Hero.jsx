/* Last updated by Anisul Islam on 01:27 AM PKT, Sunday, September 21, 2025 */
import React, { useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  // Floating particles animation
  useEffect(() => {
    const particles = document.querySelectorAll('.particle');
    animate(particles, {
      translateY: ['0px', '-10px'],
      opacity: [0.3, 0.8],
      duration: 50000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: stagger(50000),
    });
  }, []);

  // Helper function to dynamically generate the "Last updated" line
  function getLastUpdatedLine(name) {
    const now = new Date();
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
 
    };
    // Format like "Sunday, September 21, 2025, 01:27 AM PKT"
    const formattedDate = now.toLocaleString('en-US', options) + ' PKT';
    return `// Last updated by ${name} on ${formattedDate}`;
  }

  // Code sequences for the three terminals
  const frontendSequence = [
    `${getLastUpdatedLine('Anisul Islam')}
const frontend = {
  framework: 'React.js',
  styling: ['Tailwind CSS', 'CSS'],
  languages: ['JavaScript', 'TypeScript'],
  tools: ['Redux', 'Next.js'],
  init: () => {
    console.log('Building responsive UIs...');
  }
};
frontend.init();`,
    5000, // Pause after typing
  ];

  const backendSequence = [
    `
const backend = {
  runtime: 'Node.js',
  framework: 'Express.js',
  databases: ['MongoDB', 'PostgreSQL'],
  api: ['REST', 'GraphQL'],
  start: () => {
    console.log('Server running on port 3000...');
  }
};
backend.start();`,
    5000, // Pause after typing
  ];

  const toolsSequence = [
    `
const tools = {
  versionControl: 'Git',
  ide: ['VS Code', 'Android Studio'],
  deployment: 'Vercel',
  apiTesting: 'Postman',
  setup: () => {
    console.log('Toolchain ready for development...');
  }
};
tools.setup();`,
    5000, // Pause after typing
  ];

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden"
    >
      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-white rounded-full opacity-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
          }}
        />
      ))}

      {/* Header Text */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-8 px-4"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Anisul Islam - Full Stack Developer
        </h1>
      </motion.div>

      {/* Three Terminal Windows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center h-full relative z-10 py-10 sm:py-16 gap-4 sm:gap-6"
      >
        {/* Frontend Terminal */}
        <div className="w-full max-w-xs sm:max-w-sm bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="flex items-center px-4 py-2 bg-gray-800/50">
            <div className="flex space-x-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)", // Red glow
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)", // Blue glow
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)", // Green glow
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)", // Back to red
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-yellow-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)",
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)",
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)",
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)",
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
            <span className="ml-4 text-sm text-gray-400">anisul-frontend.js</span>
          </div>
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-gray-200">
            <TypeAnimation
              sequence={frontendSequence}
              wrapper="pre"
              cursor={true}
              repeat={Infinity}
              speed={60}
              style={{
                whiteSpace: 'pre-wrap',
                display: 'block',
                color: '#e5e7eb',
                backgroundColor: 'transparent',
                padding: '0',
                fontSize: 'inherit',
                lineHeight: '1.5',
                minHeight: '180px sm:min-h-[200px]',
              }}
            />
          </div>
        </div>

        {/* Backend Terminal */}
        <div className="w-full max-w-xs sm:max-w-sm bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="flex items-center px-4 py-2 bg-gray-800/50">
            <div className="flex space-x-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)", // Red glow
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)", // Blue glow
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)", // Green glow
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)", // Back to red
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-yellow-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)",
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)",
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)",
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)",
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
            <span className="ml-4 text-sm text-gray-400">anisul-backend.js</span>
          </div>
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-gray-200">
            <TypeAnimation
              sequence={backendSequence}
              wrapper="pre"
              cursor={true}
              repeat={Infinity}
              speed={60}
              style={{
                whiteSpace: 'pre-wrap',
                display: 'block',
                color: '#e5e7eb',
                backgroundColor: 'transparent',
                padding: '0',
                fontSize: 'inherit',
                lineHeight: '1.5',
                minHeight: '180px sm:min-h-[200px]',
              }}
            />
          </div>
        </div>

        {/* Tools Terminal */}
        <div className="w-full max-w-xs sm:max-w-sm bg-gray-900/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="flex items-center px-4 py-2 bg-gray-800/50">
            <div className="flex space-x-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)", // Red glow
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)", // Blue glow
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)", // Green glow
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)", // Back to red
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-yellow-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)",
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)",
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500"
                animate={{
                  boxShadow: [
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                    "0 0 8px 2px rgba(0, 0, 255, 0.5)",
                    "0 0 8px 2px rgba(0, 255, 0, 0.5)",
                    "0 0 8px 2px rgba(255, 0, 0, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
            </div>
            <span className="ml-4 text-sm text-gray-400">anisul-tools.js</span>
          </div>
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-gray-200">
            <TypeAnimation
              sequence={toolsSequence}
              wrapper="pre"
              cursor={true}
              repeat={Infinity}
              speed={60}
              style={{
                whiteSpace: 'pre-wrap',
                display: 'block',
                color: '#e5e7eb',
                backgroundColor: 'transparent',
                padding: '0',
                fontSize: 'inherit',
                lineHeight: '1.5',
                minHeight: '180px sm:min-h-[200px]',
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6"
      >
        <a
          href="#projects"
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm sm:text-base rounded-lg hover:shadow-lg transition-all flex items-center justify-center group"
        >
          View My Work
          <svg className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
        <a
          href="#about"
          className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border-2 border-emerald-500 text-emerald-400 font-bold text-sm sm:text-base rounded-lg hover:bg-emerald-500/10 transition-all flex items-center justify-center group"
        >
          About me
          <svg className="h-4 w-4 sm:h-5 sm:w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      
    </section>
  );
};

export default Hero;