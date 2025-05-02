import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiTwitter, FiGithub, FiInstagram } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Floating 3D elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl"></div>
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
            LET'S COLLABORATE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Touch</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ready to bring your ideas to life? Let's create something extraordinary together.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mt-8"
          ></motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information - Glass Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10 hover:border-emerald-400/30 shadow-2xl shadow-black/50 hover:shadow-emerald-400/10 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Contact Details</h3>
              <p className="text-gray-300 mb-8 text-lg">
                I'm currently available for freelance work and exciting projects. Reach out and let's discuss how we can work together.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-emerald-400/10 text-emerald-400 rounded-lg">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-sm font-medium text-gray-400">Email</h4>
                    <a href="mailto:john@example.com" className="text-lg font-medium text-white hover:text-emerald-400 transition-colors">john@example.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-emerald-400/10 text-emerald-400 rounded-lg">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-sm font-medium text-gray-400">Phone</h4>
                    <a href="tel:+15551234567" className="text-lg font-medium text-white hover:text-emerald-400 transition-colors">+1 (555) 123-4567</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 p-3 bg-emerald-400/10 text-emerald-400 rounded-lg">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-sm font-medium text-gray-400">Location</h4>
                    <p className="text-lg font-medium text-white">San Francisco, CA</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-lg font-bold text-white mb-5">Connect With Me</h4>
                <div className="flex space-x-4">
                  <motion.a 
                    whileHover={{ y: -3 }}
                    href="#" 
                    className="p-3 bg-white/5 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all border border-white/5 hover:border-emerald-400/30"
                  >
                    <FiGithub className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -3 }}
                    href="#" 
                    className="p-3 bg-white/5 text-gray-300 rounded-lg hover:bg-[#0A66C2] hover:text-white transition-all border border-white/5 hover:border-[#0A66C2]"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -3 }}
                    href="#" 
                    className="p-3 bg-white/5 text-gray-300 rounded-lg hover:bg-[#1DA1F2] hover:text-white transition-all border border-white/5 hover:border-[#1DA1F2]"
                  >
                    <FiTwitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a 
                    whileHover={{ y: -3 }}
                    href="#" 
                    className="p-3 bg-white/5 text-gray-300 rounded-lg hover:bg-[#E1306C] hover:text-white transition-all border border-white/5 hover:border-[#E1306C]"
                  >
                    <FiInstagram className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Glass Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10 hover:border-emerald-400/30 shadow-2xl shadow-black/50 hover:shadow-emerald-400/10 transition-all"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition text-white placeholder-gray-400"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition text-white placeholder-gray-400"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition text-white placeholder-gray-400"
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition text-white placeholder-gray-400"
                    placeholder="Tell me about your vision..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">
                      <FiSend className="mr-3" />
                    </span>
                    Send Message
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;