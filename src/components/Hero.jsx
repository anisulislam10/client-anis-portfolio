import React, { useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import { motion } from 'framer-motion';
import axios from 'axios';

const Hero = () => {
  const [quotes, setQuotes] = useState([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isQuoteVisible, setIsQuoteVisible] = useState(true);

  useEffect(() => {
    // Floating particles animation
    const particles = document.querySelectorAll('.particle');
    animate(particles, {
      translateY: ['0px', '-20px'],
      opacity: [0.5, 1],
      duration: 2000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      delay: stagger(200)
    });
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios('https://dummyjson.com/quotes');
        setQuotes(response.data.quotes); 
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setQuotes([
          { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
          { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
          { quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
          { quote: "Stay hungry, stay foolish.", author: "Steve Jobs" },
          { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
        ]);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const interval = setInterval(() => {
      setIsQuoteVisible(false);
      
      setTimeout(() => {
        setCurrentQuoteIndex(prevIndex => 
          prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
        );
        setIsQuoteVisible(true);
      }, 500); 
    }, 8000); 

    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
      {/* Floating 3D elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div 
          key={i}
          className="particle absolute w-1 h-1 bg-white rounded-full opacity-0"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`
          }}
        />
      ))}
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div className="absolute inset-0 bg-[size:20px_20px] [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Anisul Islam</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
              Full Stack  <span className="font-semibold text-white">Software Developer</span> & <span className="font-semibold text-white">Coding Enthusiast</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              I craft <span className="font-medium text-emerald-400">exceptional digital experiences</span> with modern web technologies, blending beautiful design with robust functionality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center group"
            >
              View My Work
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 border-2 border-emerald-500 text-emerald-400 font-bold rounded-xl hover:bg-emerald-500/10 transition-all flex items-center justify-center group"
            >
              Let's Connect
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </motion.a>
          </motion.div>

          {quotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className={`max-w-2xl mx-auto mt-16 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-emerald-400/30 shadow-2xl shadow-black/50 transition-all duration-500 ${isQuoteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="text-center">
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 rounded-full">
                  INSPIRATION
                </span>
                <blockquote className="text-xl italic text-white mb-4">
                  "{quotes[currentQuoteIndex]?.quote}"
                </blockquote>
                <p className="text-emerald-400 font-medium">
                  — {quotes[currentQuoteIndex]?.author}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-gray-400 rounded-full mt-1"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;