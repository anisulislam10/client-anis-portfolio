/* Last updated by Anisul Islam on 01:46 AM PKT, Sunday, September 21, 2025 */
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-bold text-emerald-500 hover:text-emerald-600 transition-colors flex items-center"
          >
            <span className="font-mono bg-gradient-to-r from-emerald-500 to-cyan-800 bg-clip-text text-transparent">
              &lt;anis<span className="text-gray-800">.dev</span>&gt;
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 sm:px-4 py-2 text-sm lg:text-base font-medium rounded-full transition-all ${
                  activeSection === link.id 
                    ? 'bg-emerald-500/10 text-emerald-600' 
                    : 'text-gray-700 hover:bg-emerald-500/5 hover:text-emerald-600'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 px-4 sm:px-5 py-2 sm:py-2.5 text-sm lg:text-base font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-emerald-400/30 transition-all hover:from-emerald-600 hover:to-cyan-600 flex items-center"
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
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
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="pt-4 pb-6 space-y-2">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  activeSection === link.id 
                    ? 'bg-emerald-500/10 text-emerald-600' 
                    : 'text-gray-700 hover:bg-emerald-500/5 hover:text-emerald-600'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all flex items-center justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Me
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;