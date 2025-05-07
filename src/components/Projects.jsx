import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Projects = () => {
const [project, setproject] = useState()
  useEffect(() => {
    const fetchData=async()=>{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}project/get`)
      setproject(response.data.projects)

    }
    fetchData()
  }, [])
  

  const displayedProjects= project?.slice(0,6)
  return (
    <section id="projects" className="relative py-28 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
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
            PORTFOLIO SHOWCASE
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Projects</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Cutting-edge solutions that blend innovative technology with stunning design.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mx-auto mt-8"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {displayedProjects?.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-emerald-400/30 shadow-2xl shadow-black/50 hover:shadow-emerald-400/10 transition-all"
            >
              <div className="relative h-60 overflow-hidden">
              <img 
  src={`${import.meta.env.VITE_BASE_URL.replace('/api/v1/', '')}/public${project.imageUrl}`}
  alt={project.title}
  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
/>
{
  console.log("image----",`${import.meta.env.VITE_BASE_URL.replace('/api/v1/', '')}/public${project.imageUrl}` )
}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-emerald-400/10 text-emerald-400 text-xs font-semibold rounded-full backdrop-blur-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 mb-5">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.liveDemoUrl}
                    className="flex-1 flex items-center justify-center px-4 py-2.5 bg-emerald-400/10 text-emerald-400 rounded-lg font-medium hover:bg-emerald-400/20 transition-colors border border-emerald-400/20"
                  >
                    <FiExternalLink className="mr-2" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={project.githubUrl}
                    className="flex-1 flex items-center justify-center px-4 py-2.5 bg-white/5 text-gray-300 rounded-lg font-medium hover:bg-white/10 transition-colors border border-white/10"
                  >
                    <FiGithub className="mr-2" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg transition-all group"
          ><Link
    to="/all-projects"
    className="inline-flex items-center px-8 py-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl hover:shadow-lg transition-all group"
  >
            View All Projects
           
            <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" /> </Link>
          </motion.a>
          
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;