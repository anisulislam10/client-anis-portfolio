import React from 'react';
import { Link } from 'react-router-dom'; // only if using react-router
import { motion } from 'framer-motion';
import { FiClock, FiShoppingBag, FiMail, FiInstagram, FiTwitter } from 'react-icons/fi';

const Shop_page = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-hidden">

      {/* --- Menu bar --- */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-emerald-600">AnisDev</h1>
          <div className="space-x-6">
            {/* Home button (goes to home page) */}
            <Link
              to="/"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Home
            </Link>

            {/* Shop button (scrolls to #shop on this page) */}
            <a
              href="#shop"
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Shop
            </a>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-emerald-100 rounded-full filter blur-[100px] opacity-20"
        ></motion.div>
        <motion.div
          initial={{ x: 100, y: 100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-1/3 right-10 w-72 h-72 bg-purple-100 rounded-full filter blur-[100px] opacity-20"
        ></motion.div>
      </div>

      {/* Shop Section */}
      <motion.div 
        id="shop"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="max-w-lg mx-auto mt-28 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
      >
        {/* Header with animated gradient */}
        <div className="relative h-2 bg-gradient-to-r from-emerald-400 to-purple-500 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </div>

        <div className="p-10 text-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full animate-ping"></div>
              <div className="relative bg-gradient-to-br from-emerald-100 to-emerald-50 p-5 rounded-2xl shadow-inner border border-emerald-100">
                <FiShoppingBag className="h-12 w-12 text-emerald-600" />
              </div>
            </div>
          </motion.div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-purple-600">
            Exciting Things Coming
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            We're building something special for you. Our shop will be launching soon with curated products you'll love.
          </p>
          
          <div className="flex items-center justify-center space-x-3 text-gray-500 mb-10">
            <FiClock className="h-6 w-6 text-emerald-500" />
            <span className="text-lg font-medium">Launching Q2 2025</span>
          </div>
          
          {/* Animated progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 mb-10 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 2.5, delay: 0.5, type: 'spring' }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/80"></div>
            </motion.div>
          </div>
          
          {/* Email signup */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-5 py-4 pr-16 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg px-4 flex items-center justify-center"
              >
                <FiMail className="h-5 w-5" />
              </motion.button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Get notified when we launch</p>
          </div>
          
          {/* Social links */}
          <div className="flex justify-center space-x-4 mb-2">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <FiInstagram className="h-6 w-6" />
            </motion.a>
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <FiTwitter className="h-6 w-6" />
            </motion.a>
          </div>
          <p className="text-sm text-gray-500">
            Follow <span className="text-emerald-600 font-medium">@anisdev</span> for updates
          </p>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50/50 px-8 py-6 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} AnisDev. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Shop_page;
