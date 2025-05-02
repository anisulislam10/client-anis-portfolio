import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCode, FaServer } from "react-icons/fa";
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Floating 3D elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div className="absolute inset-0 bg-[size:20px_20px] [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 text-sm font-medium tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full mb-6"
          >
            PROFESSIONAL PROFILE
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Me</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mt-8"
          ></motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-1/3 relative"
          >
            <div className="w-72 h-72 mx-auto rounded-full overflow-hidden border-4 border-emerald-400/30 shadow-2xl shadow-emerald-400/10 group relative">
              <img
                src="https://sharplogicians.com/_next/image?url=https%3A%2F%2Fsharplogicians.com%2Fapi%2Fmedia%2Fteam%2FAnis_React_JS_Sharplogicians.png&w=750&q=75"
                alt="Profile"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:w-2/3"
          >
            <h3 className="text-2xl font-semibold text-emerald-400 mb-6">
              Full Stack Software Engineer
            </h3>
            
            <div className="space-y-6 mb-8">
              <p className="text-gray-300 leading-relaxed">
                I'm a passionate <strong className="text-emerald-400">Full Stack Developer</strong> with 2+ years of experience building modern, performant web and mobile applications. I specialize in JavaScript technologies across the entire stack.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-start gap-3">
                  <FaCode className="text-emerald-400 text-xl mt-1" />
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Frontend Expertise</h4>
                    <p className="text-gray-400">
                      React.js, React Native, Next.js, Tailwind CSS, Redux
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FaServer className="text-emerald-400 text-xl mt-1" />
                  <div>
                    <h4 className="text-lg font-medium text-white mb-2">Backend Expertise</h4>
                    <p className="text-gray-400">
                      Node.js, Express.js, MongoDB, PostgreSQL, REST APIs
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                I thrive on crafting clean UIs and solving complex backend problems, ensuring the end user gets the best experience possible through efficient and scalable solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10 hover:border-emerald-400/50 flex items-center gap-4 transition-all"
              >
                <div className="text-emerald-400 text-xl">
                  <FaUser />
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Name</span>
                  <span className="text-base font-medium text-white">Anisul Islam</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10 hover:border-emerald-400/50 flex items-center gap-4 transition-all"
              >
                <div className="text-emerald-400 text-xl">
                  <FaEnvelope />
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Email</span>
                  <span className="text-base font-medium text-white">anis.inbox10@gmail.com</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10 hover:border-emerald-400/50 flex items-center gap-4 transition-all"
              >
                <div className="text-emerald-400 text-xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Location</span>
                  <span className="text-base font-medium text-white">Islamabad | Chitral | PK</span>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm px-5 py-4 rounded-xl border border-white/10 hover:border-emerald-400/50 flex items-center gap-4 transition-all"
              >
                <div className="text-emerald-400 text-xl">
                  <FaBriefcase />
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Experience</span>
                  <span className="text-base font-medium text-white">2+ Years</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;