import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { animate, stagger } from 'animejs';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Header animation on load
    animate('.header-logo', {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });

    animate('.nav-item', {
      opacity: [0, 1],
      translateY: [-10, 0],
      delay: stagger(100, { start: 300 }),
      duration: 600,
      easing: 'easeOutBack'
    });
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'shop', label: 'Shop' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },

  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-2' : 'bg-white/80 backdrop-blur-md py-3'}`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="header-logo text-2xl font-bold text-emerald-500 opacity-0 hover:text-emerald-600 transition-colors flex items-center"
            >
              <span className="font-mono bg-gradient-to-r from-emerald-500 to-cyan-800 bg-clip-text text-transparent ">
                &lt;anisul<span className="text-gray-800">.dev</span>&gt;
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`#${link.id}`}
                className={`nav-item px-4 py-2 text-sm font-medium rounded-full transition-all opacity-0
                  ${activeSection === link.id ? 
                    'bg-emerald-500/10 text-emerald-600' : 
                    'text-gray-700 hover:bg-emerald-500/5 hover:text-emerald-600'
                  }
                `}
                style={{ transitionDelay: `${300 + (index * 100)}ms` }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className={`nav-item ml-2 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-emerald-400/30 transition-all opacity-0 hover:from-emerald-600 hover:to-cyan-600 flex items-center`}
              style={{ transitionDelay: `${800}ms` }}
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          initial={false}
          animate={mobileMenuOpen ? "open" : "closed"}
          variants={{
            open: { 
              opacity: 1,
              height: "auto",
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            },
            closed: { 
              opacity: 0,
              height: 0,
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }
          }}
          className={`md:hidden overflow-hidden`}
        >
          <div className="pt-4 pb-6 space-y-2">
            {navLinks.map(link => (
              <motion.a
                key={link.id}
                whileHover={{ x: 5 }}
                href={`#${link.id}`}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors
                  ${activeSection === link.id ? 
                    'bg-emerald-500/10 text-emerald-600' : 
                    'text-gray-700 hover:bg-emerald-500/5 hover:text-emerald-600'
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="#contact"
              className=" mt-2 px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Me
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>



            
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;