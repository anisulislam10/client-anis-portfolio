import { useEffect } from 'react';
import { animate, stagger } from 'animejs';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiReact as SiReactNative,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiTypescript,
  SiRedux,
  SiNextdotjs,
  SiGraphql,
  SiSwagger,
  SiAndroidstudio,
  SiFirebase
} from 'react-icons/si';
import { FaTools } from 'react-icons/fa';
import { BsTriangleFill } from 'react-icons/bs';
import { VscVscode } from "react-icons/vsc";
import { motion } from 'framer-motion';

const skills = [
  { name: 'React.js', icon: <SiReact className="text-[#61DAFB]" />, category: 'frontend' },
  { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" />, category: 'backend' },
  { name: 'Express.js', icon: <SiExpress className="text-[#000000]" />, category: 'backend' },
  { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" />, category: 'backend' },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791]" />, category: 'backend' },
  { name: 'React Native', icon: <SiReactNative className="text-[#61DAFB]" />, category: 'frontend' },
  { name: 'JavaScript', icon: <SiJavascript className="text-[#F7DF1E]" />, category: 'frontend' },
  { name: 'HTML', icon: <SiHtml5 className="text-[#E34F26]" />, category: 'frontend' },
  { name: 'CSS', icon: <SiCss3 className="text-[#1572B6]" />, category: 'frontend' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" />, category: 'frontend' },
  { name: 'Git', icon: <SiGit className="text-[#F05032]" />, category: 'tools' },
  { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" />, category: 'frontend' },
  { name: 'Redux', icon: <SiRedux className="text-[#764ABC]" />, category: 'frontend' },
  { name: 'Next.js', icon: <SiNextdotjs className="text-[#000000]" />, category: 'frontend' },
  { name: 'REST APIs', icon: <SiSwagger className="text-[#2e31c5]" />, category: 'tools' },
  { name: 'Vercel', icon: <BsTriangleFill className="text-[#080507]" />, category: 'tools' },
  { name: 'Postman', icon: <FaTools className="text-[#ee9d33]" />, category: 'tools' },
  { name: 'VS Code', icon: <VscVscode className="text-[#336eee]" />, category: 'tools' },
  { name: 'Android Studio', icon: <SiAndroidstudio className="text-[#2ad32a]" />, category: 'tools' },
];

const Skills = () => {
  useEffect(() => {
    animate('.skills-title', {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      easing: 'easeOutExpo'
    });

    animate('.skill-item', {
      opacity: [0, 1],
      scale: [0.8, 1],
      translateY: [20, 0],
      delay: stagger(100, { start: 300 }),
      duration: 600,
      easing: 'spring(1, 80, 10, 0)'
    });
  }, []);

  return (
    <section id="skills" className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
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
            TECHNICAL EXPERTISE
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Skills</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Technologies I've mastered to build exceptional digital experiences
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mt-8"
          ></motion.div>
        </div>

        {/* All Skills Grid */}
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto mb-16">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="skill-item opacity-0 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 
                         hover:border-emerald-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-400/10 transition-all duration-300
                         flex items-center group"
            >
              <span className="mr-2 text-xl">
                {skill.icon}
              </span>
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Skill Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Frontend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-emerald-400/30 shadow-2xl shadow-black/50 hover:shadow-emerald-400/10 transition-all"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse"></span>
              Frontend Development
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills
                .filter(skill => skill.category === 'frontend')
                .map((skill) => (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    key={skill.name}
                    className="px-4 py-2 bg-emerald-400/10 text-emerald-400 rounded-full text-sm flex items-center border border-emerald-400/20"
                  >
                    <span className="mr-2">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
            </div>
          </motion.div>

          {/* Backend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-blue-400/30 shadow-2xl shadow-black/50 hover:shadow-blue-400/10 transition-all"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="w-3 h-3 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
              Backend Development
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills
                .filter(skill => skill.category === 'backend')
                .map((skill) => (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    key={skill.name}
                    className="px-4 py-2 bg-blue-400/10 text-blue-400 rounded-full text-sm flex items-center border border-blue-400/20"
                  >
                    <span className="mr-2">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/10 hover:border-purple-400/30 shadow-2xl shadow-black/50 hover:shadow-purple-400/10 transition-all"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <span className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></span>
              Tools & Platforms
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills
                .filter(skill => skill.category === 'tools')
                .map((skill) => (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    key={skill.name}
                    className="px-4 py-2 bg-purple-400/10 text-purple-400 rounded-full text-sm flex items-center border border-purple-400/20"
                  >
                    <span className="mr-2">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;