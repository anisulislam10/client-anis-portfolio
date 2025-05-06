import {
  FiMail, FiPhone, FiMapPin, FiSend,
  FiLinkedin, FiTwitter, FiGithub, FiInstagram
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    subject: '',
    yourMessage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}contact/sent-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Your message has been successfully delivered,will respond as soon as possible. anis.dev' });
        setFormData({
          fullname: '',
          email: '',
          subject: '',
          yourMessage: ''
        });
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Failed to send message.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Network error. Try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 text-sm font-medium tracking-wider text-emerald-400 bg-emerald-400/10 rounded-full mb-6"
          >
            LET'S COLLABORATE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Touch</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ready to bring your ideas to life? Let's create something extraordinary together.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10 shadow-xl hover:shadow-emerald-400/10 transition-all">
            <h3 className="text-2xl font-bold text-white mb-8">Contact Details</h3>
            <p className="text-gray-300 mb-8 text-lg">
              I’m currently available for freelance work and exciting projects. Reach out and let’s chat!
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-3 bg-emerald-400/10 text-emerald-400 rounded-lg">
                  <FiMail className="w-6 h-6" />
                </div>
                <div className="ml-5">
                  <h4 className="text-sm font-medium text-gray-400">Email</h4>
                  <a href="mailto:anis.inbox10@gmail.com" className="text-lg font-medium text-white hover:text-emerald-400">
                    anis.inbox10@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-emerald-400/10 text-emerald-400 rounded-lg">
                  <FiPhone className="w-6 h-6" />
                </div>
                <div className="ml-5">
                  <h4 className="text-sm font-medium text-gray-400">Phone</h4>
                  <a href="tel:+923439275550" className="text-lg font-medium text-white hover:text-emerald-400">
                    +92 (343) 9275550
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 bg-emerald-400/10 text-emerald-400 rounded-lg">
                  <FiMapPin className="w-6 h-6" />
                </div>
                <div className="ml-5">
                  <h4 className="text-sm font-medium text-gray-400">Location</h4>
                  <p className="text-lg font-medium text-white">Bahria Town Islamabad, PK</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="text-lg font-bold text-white mb-5">Connect With Me</h4>
              <div className="flex space-x-4">
                {[FiGithub, FiLinkedin, FiTwitter, FiInstagram].map((Icon, i) => (
                  <motion.a key={i} whileHover={{ y: -3 }} href="#" className="p-3 bg-white/5 text-gray-300 rounded-lg border border-white/10 hover:text-white hover:border-emerald-400/30 transition-all">
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 border border-white/10 shadow-xl hover:shadow-emerald-400/10 transition-all">
            <h3 className="text-2xl font-bold text-white mb-8">Send a Message</h3>

            {submitStatus.message && (
              <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              />
              <textarea
                name="yourMessage"
                rows="5"
                placeholder="Your Message"
                value={formData.yourMessage}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 text-white rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                <FiSend className="mr-2" /> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
