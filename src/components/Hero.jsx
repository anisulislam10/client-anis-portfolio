import React, { useEffect, useState, useRef } from 'react';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTech, setCurrentTech] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const technologies = [
    'Full Stack Engineer',
    'React.js Specialist',
    'Node.js Expert',
    'TypeScript Engineer',
    'MongoDB Engineer',
    'Next.js Engineer',
    'Express.js Engineer'
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const currentWord = technologies[currentTech];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentTech((prev) => (prev + 1) % technologies.length);
      } else {
        setText(isDeleting ? currentWord.substring(0, text.length - 1) : currentWord.substring(0, text.length + 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentTech, technologies]);

  useEffect(() => {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.3,
        hue: Math.random() * 60 + 160
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.opacity})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i < j) {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const avgHue = (p.hue + p2.hue) / 2;
              ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${0.2 * (1 - dist / 100)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex items-center justify-center"
    >
      <canvas id="particleCanvas" className="absolute inset-0"></canvas>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-32 w-[700px] h-[700px] rounded-full blur-[150px] animate-float opacity-40"
          style={{ 
            background: 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * 80}px, ${mousePosition.y * 80}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        <div 
          className="absolute bottom-1/4 -right-32 w-[700px] h-[700px] rounded-full blur-[150px] animate-float-delayed opacity-40"
          style={{ 
            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
            transform: `translate(${mousePosition.x * -50}px, ${mousePosition.y * -50}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow opacity-30"
          style={{ 
            background: 'radial-gradient(circle, rgba(168,85,247,0.35) 0%, transparent 70%)',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 60}px, ${mousePosition.y * 60}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex justify-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-blue-500/5 border border-emerald-400/20 backdrop-blur-xl shadow-2xl shadow-emerald-500/5 hover:shadow-emerald-500/10 transition-all duration-500 group">
              <div className="relative flex items-center justify-center">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping absolute opacity-75" />
                <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50" />
              </div>
              <span className="text-sm font-bold text-emerald-300 tracking-[0.25em] group-hover:tracking-[0.3em] transition-all duration-300">
                AVAILABLE FOR WORK
              </span>
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="text-center mb-20 space-y-10">
            <div className="relative inline-block animate-fade-in-up">
              <h1 className="text-8xl sm:text-9xl lg:text-[5rem] font-black tracking-[-0.02em] leading-[0.9] mb-4">
                <span className="relative inline-block group">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-cyan-300 to-emerald-400 drop-shadow-5xl animate-gradient-x">
                    ANISUL
                  </span>
                  <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-br from-emerald-400 to-cyan-400 -z-10 group-hover:opacity-70 transition-opacity duration-500" />
                </span>
                <br />
                <span className="relative inline-block group">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-blue-400 to-purple-400 drop-shadow-2xl animate-gradient-x-reverse">
                    ISLAM
                  </span>
                  <div className="absolute inset-0 blur-3xl opacity-50 bg-gradient-to-br from-cyan-400 to-purple-400 -z-10 group-hover:opacity-70 transition-opacity duration-500" />
                </span>
              </h1>
            </div>

            <div className="h-10 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <div className="relative group">
                <h2 className="text-5xl sm:text-6xl lg:text-4xl font-bold tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 drop-shadow-lg">
                    {text}
                  </span>
                  <span className="text-cyan-300 animate-cursor ml-1">|</span>
                </h2>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl -z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              </div>
            </div>

            <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 max-w-5xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '300ms' }}>
              Architecting{' '}
              <span className="relative inline-block group">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 font-semibold">
                  extraordinary digital experiences
                </span>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </span>
              {' '}with modern technologies
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
            <a
              href="#projects"
              className="group relative px-14 py-7 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white font-black text-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.5)] hover:shadow-[0_25px_80px_-15px_rgba(6,182,212,0.7)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12" />
              <span className="relative z-10 flex items-center gap-4 tracking-wide">
                VIEW MY WORK
                <svg className="h-7 w-7 transition-transform group-hover:translate-x-2 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>

            <a
              href="#about"
              className="group relative px-14 py-7 border-2 border-cyan-400/50 text-cyan-300 font-black text-xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500 backdrop-blur-sm hover:border-cyan-400 hover:bg-cyan-500/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
              <span className="relative z-10 flex items-center gap-4 tracking-wide">
                ABOUT ME
                <svg className="h-7 w-7 transition-transform group-hover:rotate-12 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes gradient-x-reverse {
          0%, 100% { background-position: 100% 50%; }
          50% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-40px) scale(1.05); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-35px) scale(1.05); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes cursor {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }

        .animate-gradient-x-reverse {
          background-size: 200% 200%;
          animation: gradient-x-reverse 5s ease infinite;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-cursor {
          animation: cursor 1s step-start infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;