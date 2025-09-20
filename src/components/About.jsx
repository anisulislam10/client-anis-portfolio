/* Last updated by Anisul Islam on 01:32 AM PKT, Sunday, September 21, 2025 */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCode, FaServer } from "react-icons/fa";

const About = () => {
  // Typing counter animation
  const [experienceYears, setExperienceYears] = useState(0);
  const [projectsCompleted, setProjectsCompleted] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      if (experienceYears < 2) setExperienceYears(prev => prev + 1);
    }, 1000); // Slower increment for smoother animation

    const interval2 = setInterval(() => {
      if (projectsCompleted < 15) setProjectsCompleted(prev => prev + 1);
    }, 200); // Faster but controlled increment

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [experienceYears, projectsCompleted]);

  return (
    <section
      id="about"
      className="relative min-h-screen py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-400 bg-emerald-400/10 rounded-full mb-6 sm:mb-8 border border-emerald-400/20"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
            PROFESSIONAL PROFILE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 sm:w-32 h-1.5 bg-emerald-400 rounded-full mx-auto"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3"
          >
            <div className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 mx-auto rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 border-2 border-emerald-400/30 rounded-3xl z-10"></div>
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src="/1.png"
                alt="Anisul Islam - Full Stack Developer"
                className="w-full h-full object-cover transition-transform duration-300 relative z-0"
              />
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3 space-y-6 sm:space-y-8"
          >
            <div>
              <motion.h3
                className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-3 sm:mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Full Stack Software Engineer
              </motion.h3>
              <motion.div
                className="w-16 sm:w-20 h-1 bg-emerald-400 rounded mb-4 sm:mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </div>

            <div className="space-y-4 sm:space-y-6">
              <motion.p
                className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                I'm a passionate <strong className="text-emerald-400 font-semibold">Full Stack Developer</strong> with {experienceYears}+ years of experience building modern, performant web and mobile applications. I specialize in JavaScript technologies across the entire stack, creating seamless digital experiences.
              </motion.p>

              {/* Expertise Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  className="p-4 sm:p-6 bg-emerald-500/10 rounded-2xl border border-emerald-400/20 hover:border-emerald-400/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl">
                      <FaCode />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white">Frontend Expertise</h4>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    React.js, React Native, Next.js, Tailwind CSS, Redux, TypeScript
                  </p>
                </motion.div>

                <motion.div
                  className="p-4 sm:p-6 bg-purple-500/10 rounded-2xl border border-purple-400/20 hover:border-purple-400/50 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <motion.div
                      className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl relative"
                      animate={{
                        boxShadow: [
                          "0 0 10px 2px rgba(0, 255, 0, 0.5)", // Green glow
                          "0 0 10px 2px rgba(255, 0, 0, 0.5)", // Red glow
                          "0 0 10px 2px rgba(0, 255, 0, 0.5)", // Back to green
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaServer />
                    </motion.div>
                    <h4 className="text-lg sm:text-xl font-semibold text-white">Backend Expertise</h4>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                    Node.js, Express.js, MongoDB, PostgreSQL, REST APIs, GraphQL
                  </p>
                </motion.div>
              </div>

              <motion.p
                className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                I thrive on crafting beautiful, intuitive user interfaces and architecting robust backend systems. My goal is to deliver exceptional user experiences through clean code, innovative solutions, and attention to detail.
              </motion.p>
            </div>

            {/* Info Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: FaUser, label: "Name", value: "Anisul Islam", color: "emerald" },
                { icon: FaEnvelope, label: "Email", value: "anis.inbox10@gmail.com", color: "cyan" },
                { icon: FaMapMarkerAlt, label: "Location", value: "Islamabad | Chitral | PK", color: "purple" },
                { icon: FaBriefcase, label: "Experience", value: `${experienceYears}+ Years`, color: "pink" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -5 }}
                  className={`p-4 sm:p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-${item.color}-400/50 transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`text-${item.color}-400 text-lg sm:text-xl`}>
                      <item.icon />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm text-gray-400 font-medium">{item.label}</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{item.value}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Section */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center min-w-[100px]">
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1 sm:mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                >
                  {projectsCompleted}+
                </motion.div>
                <div className="text-gray-400 text-xs sm:text-sm">Projects Completed</div>
              </div>
              <div className="text-center min-w-[100px]">
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring", stiffness: 200 }}
                >
                  {experienceYears}+
                </motion.div>
                <div className="text-gray-400 text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="text-center min-w-[100px]">
                <motion.div
                  className="text-2xl sm:text-3xl font-bold text-purple-400 mb-1 sm:mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                >
                  100%
                </motion.div>
                <div className="text-gray-400 text-xs sm:text-sm">Client Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;