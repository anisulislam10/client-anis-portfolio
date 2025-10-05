import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const roles = [
    'Senior Full Stack Engineer',
    'React & Next.js Specialist',
    'Node.js & TypeScript Expert',
    'Software Architecture'
  ];

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Typing and backspace effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        // Pause at full text, then start deleting
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        // Finished deleting, move to next role
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        // Typing or deleting
        setDisplayText(
          isDeleting 
            ? currentRole.substring(0, displayText.length - 1)
            : currentRole.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <section
      id="home"
      className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center"
    >
      {/* Premium Background */}
      <div className="absolute inset-0">
        {/* Sophisticated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        
        {/* Subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      </div>

      {/* Professional Accent Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-24 bg-white/10" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-1 bg-white/10" />
        <div className="absolute top-1/3 right-1/3 w-0.5 h-16 bg-white/5" />
        <div className="absolute bottom-1/3 left-1/3 w-16 h-0.5 bg-white/5" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
        <div className="text-center">
          
          {/* Professional Status Indicator */}
          <div className={`flex justify-center  transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-300 tracking-wider uppercase">
                  Currently Available
                </span>
              </div>
            </div>
          </div>

          {/* Executive Name Display */}
          <div className={`mb-16 transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-tight">
                Anisul Islam
              </h1>
              <div className="w-24 h-0.5 bg-white/20 mx-auto" />
            </div>
          </div>

          {/* Professional Role Display with Typing Effect */}
          <div className={`mb-16 transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <div className="h-12 flex items-center justify-center">
              <h2 className="text-2xl text-gray-400 font-light tracking-wide min-h-[2rem]">
                {displayText}
                <span className="ml-1 text-emerald-400 animate-pulse">|</span>
              </h2>
            </div>
          </div>

          {/* Professional Value Proposition */}
          <div className={`mb-20 transition-all duration-800 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Delivering enterprise-grade solutions through modern architecture 
              and exceptional engineering craftsmanship.
            </p>
          </div>

          {/* Executive Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-800 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <a
              href="#portfolio"
              className="group px-10 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl"
            >
              <span>View Portfolio</span>
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="#contact"
              className="group px-10 py-4 border border-white/30 text-white font-semibold rounded-lg hover:border-white/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
            >
              <span>Start Conversation</span>
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>

          {/* Professional Metrics */}
          <div className={`grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 transition-all duration-800 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <div className="text-2xl font-light text-white mb-1">2+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-white mb-1">50+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-white mb-1">100%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Scroll Indicator */}
      <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-800 delay-1300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center space-y-3">
          <span className="text-xs text-gray-500 font-medium tracking-widest">EXPLORE PORTFOLIO</span>
          <div className="w-px h-12 bg-gray-600">
            <div className="w-px h-6 bg-white/80 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;