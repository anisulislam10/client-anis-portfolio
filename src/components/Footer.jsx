import { useState, useEffect } from 'react';
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaInstagram,
  FaHeart,
  FaServer,
  FaCode,
  FaRocket,
  FaShieldAlt,
  FaRegClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [serverStatus, setServerStatus] = useState('checking');
  const [responseTime, setResponseTime] = useState(0);

  // Mock server status check
  useEffect(() => {
    const checkServerStatus = async () => {
      setServerStatus('checking');
      const startTime = Date.now();
      
      try {
        // Simulate API call to check server status
        await new Promise(resolve => setTimeout(resolve, 800));
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        
        // Random status for demo (in real app, use actual API endpoint)
        const statuses = ['online'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setServerStatus(randomStatus);
      } catch (error) {
        setServerStatus('online');
      }
    };

    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (serverStatus) {
      case 'online':
        return <FaCheckCircle className="text-green-500 animate-pulse" />;
      case 'degraded':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'offline':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaRegClock className="text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case 'online':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'offline':
        return 'text-red-400';
      default:
        return 'text-blue-400';
    }
  };

  const getStatusText = () => {
    switch (serverStatus) {
      case 'online':
        return 'All Systems Operational';
      case 'degraded':
        return 'Partial Outage';
      case 'offline':
        return 'Service Disrupted';
      default:
        return 'Checking Status...';
    }
  };

  return (
    <footer className='bg-gradient-to-br from-gray-900 to-gray-800 text-gray-400 py-16 border-t border-gray-700'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8'>
          {/* Brand Section */}
          <div className='lg:col-span-1'>
            <div className='text-center md:text-left'>
              <div className='flex items-center justify-center md:justify-start space-x-3 mb-4'>
                <div className='bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg'>
                  <FaCode className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-2xl font-bold text-white'>
                  Anisul <span className='text-green-400'>Islam</span>
                </h3>
              </div>
              <p className='text-sm leading-relaxed mb-4'>
                Passionate Full Stack Engineer with 2+ years of experience 
                crafting dynamic web and mobile applications. Transforming 
                ideas into seamless digital experiences.
              </p>
              
              {/* Server Status Widget */}
              <div className='bg-gray-800 rounded-lg p-4 border border-gray-700'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center space-x-2'>
                    <FaServer className='w-4 h-4 text-blue-400' />
                    <span className='text-sm font-medium text-white'>Server Status</span>
                  </div>
                  {getStatusIcon()}
                </div>
                <div className='flex justify-between items-center'>
                  <span className={`text-xs font-semibold ${getStatusColor()}`}>
                    {getStatusText()}
                  </span>
                  {responseTime > 0 && (
                    <span className='text-xs text-gray-500'>
                      {responseTime}ms
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='text-center md:text-left'>
            <h4 className='text-lg text-white font-semibold mb-6 flex items-center justify-center md:justify-start space-x-2'>
              <FaRocket className='w-4 h-4 text-green-400' />
              <span>Developer Resources</span>
            </h4>
            <ul className='space-y-3'>
              {[
                { name: 'JavaScript Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
                { name: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html' },
                { name: 'Node.js Guides', url: 'https://nodejs.org/en/docs/' },
                { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/' },
                { name: 'MongoDB University', url: 'https://learn.mongodb.com/' },
                { name: 'Express.js Guide', url: 'https://expressjs.com/en/starter/basic-routing.html' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm hover:text-green-400 transition-colors duration-300 flex items-center space-x-2 group'
                  >
                    <div className='w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform'></div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* API & Tools */}
          <div className='text-center md:text-left'>
            <h4 className='text-lg text-white font-semibold mb-6 flex items-center justify-center md:justify-start space-x-2'>
              <FaShieldAlt className='w-4 h-4 text-blue-400' />
              <span>API & Tools</span>
            </h4>
            <ul className='space-y-3'>
              {[
                { name: 'GitHub Repository', url: 'https://github.com/' },
                { name: 'Postman API Docs', url: 'https://www.postman.com/api-documentation' },
                { name: 'Swagger Documentation', url: 'https://swagger.io/docs/' },
                { name: 'Axios HTTP Client', url: 'https://axios-http.com/docs/intro' },
                { name: 'REST API Design', url: 'https://restfulapi.net/' },
                { name: 'Web Security Guide', url: 'https://owasp.org/www-project-top-ten/' }
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-sm hover:text-blue-400 transition-colors duration-300 flex items-center space-x-2 group'
                  >
                    <div className='w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform'></div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className='text-center md:text-left'>
            <h3 className='text-xl font-semibold text-white mb-6 flex items-center justify-center md:justify-start space-x-2'>
              <span>Let's Connect</span>
            </h3>
            
            {/* Social Links */}
            <div className='flex justify-center md:justify-start space-x-4 mb-6'>
              {[
                { Icon: FaGithub, url: 'https://github.com/anisulislam10', label: 'GitHub', color: 'hover:text-gray-300' },
                { Icon: FaTwitter, url: 'https://x.com/ianisulislam', label: 'Twitter', color: 'hover:text-blue-400' },
                { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/ianisulislam/', label: 'LinkedIn', color: 'hover:text-blue-500' },
                { Icon: FaFacebookF, url: 'https://facebook.com/ianisulislam', label: 'Facebook', color: 'hover:text-blue-600' },
                { Icon: FaInstagram, url: 'https://www.instagram.com/ianisulislam', label: 'Instagram', color: 'hover:text-pink-500' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`p-3 bg-gray-800 rounded-lg ${social.color} transition-all duration-300 hover:bg-gray-700 hover:scale-110 border border-gray-700`}
                  aria-label={social.label}
                >
                  <social.Icon className='w-5 h-5' />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className='space-y-3'>
              <div className='flex items-center justify-center md:justify-start space-x-3 group cursor-pointer'>
                <div className='p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors'>
                  <FaHeart className='w-4 h-4 text-green-400' />
                </div>
                <div>
                  <p className='text-sm font-medium text-white'>Email</p>
                  <a
                    href='mailto:anis.inbox10@gmail.com'
                    className='text-sm hover:text-green-400 transition-colors'
                  >
                    anis.inbox10@gmail.com
                  </a>
                </div>
              </div>
              
              <div className='flex items-center justify-center md:justify-start space-x-3 group cursor-pointer'>
                <div className='p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors'>
                  <FaRegClock className='w-4 h-4 text-blue-400' />
                </div>
                <div>
                  <p className='text-sm font-medium text-white'>Phone</p>
                  <p className='text-sm'>(+92) 343 9275550</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='mt-12 pt-8 border-t border-gray-700'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-center md:text-left'>
              <p className='text-sm flex items-center justify-center md:justify-start space-x-2'>
                <span>Developed with</span>
                <FaHeart className='w-4 h-4 text-red-500 animate-pulse' />
                <span>by Anisul Islam</span>
              </p>
            </div>
            
            <div className='text-center'>
              <p className='text-sm text-gray-500'>
                &copy; {currentYear} Anisul Islam. All rights reserved.
              </p>
            </div>
            
            <div className='text-center md:text-right'>
              <p className='text-xs text-gray-600'>
                v1.0.0 • Always Learning, Always Building
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;