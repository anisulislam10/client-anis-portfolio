import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaInstagram
} from 'react-icons/fa' 

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-900 text-gray-400 py-12'>
      <div className='container mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {/* Section 1: Short Intro with Logo */}
          <div className='text-center md:text-left'>
            <h3 className='text-2xl font-bold text-white mb-2'>
              <span className='text-green-600'>Anisul Islam</span>
            </h3>
            <p className='text-sm mt-4'>
              As a passionate Full Stack Software Engineer, I possess over 2
              years of experience in crafting dynamic web and mobile
              applications. I specialize in cutting-edge technologies like
              React.js, Node.js, Express.js, MongoDB, and SQL, turning ideas
              into seamless user experiences.
            </p>
            <p className='text-sm mt-2'>
              I strive to combine the art of clean UI design with the science of
              solving complex backend challenges, delivering solutions that are
              both scalable and efficient to ensure the ultimate user
              satisfaction.
            </p>
          </div>

          {/* Section 2: Developer Section with Useful Links */}
          <div className='text-center md:text-left'>
            <h4 className='text-lg text-white font-semibold mb-2'>
              Useful Links
            </h4>
            <ul className='text-sm'>
              <li>
                <a
                  href='https://developer.mozilla.org/en-US/docs/Web/JavaScript'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  JavaScript Docs
                </a>
              </li>
              <li>
                <a
                  href='https://reactjs.org/docs/getting-started.html'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  React Docs
                </a>
              </li>
              <li>
                <a
                  href='https://nodejs.org/en/docs/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  Node.js Docs
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='https://www.postman.com/api-documentation'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  Postman API Docs
                </a>
              </li>
              <li>
                <a
                  href='https://swagger.io/docs/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  Swagger API Docs
                </a>
              </li>
              <li>
                <a
                  href='https://axios-http.com/docs/intro'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  Axios Docs
                </a>
              </li>
              <li>
                <a
                  href='https://expressjs.com/en/starter/basic-routing.html'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  Express.js Docs
                </a>
              </li>
              <li>
                <a
                  href='https://restfulapi.net/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-green-400'
                >
                  RESTful API Design Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3: Connect with Me */}
          <div className='text-center md:text-left'>
            <h3 className='text-xl font-semibold text-white mb-2'>
              Connect with Me
            </h3>
            <div className='flex justify-center md:justify-start space-x-4 mb-4'>
              <a
                href='https://github.com/anisulislam10'
                className='hover:text-green-400 transition'
                aria-label='GitHub'
              >
                <FaGithub className='w-6 h-6' />
              </a>
              <a
                href='https://x.com/ianisulislam'
                className='hover:text-green-400 transition'
                aria-label='Twitter'
              >
                <FaTwitter className='w-6 h-6' />
              </a>
              <a
                href='https://www.linkedin.com/in/ianisulislam/'
                className='hover:text-green-400 transition'
                aria-label='LinkedIn'
              >
                <FaLinkedin className='w-6 h-6' />
              </a>
              <a
                href='https://facebook.com/ianisulislam'
                className='hover:text-green-400 transition'
                aria-label='Facebook'
              >
                <FaFacebookF className='w-6 h-6' />
              </a>

              <a
                href='https://www.instagram.com/ianisulislam'
                className='hover:text-green-400 transition'
                aria-label='Instagram'
              >
                <FaInstagram className='w-6 h-6' />
              </a>
            </div>
            <p className='text-sm'>
              <span className='font-semibold'>Email:</span>{' '}
              <a
                href='mailto:email@example.com'
                className='text-gray-400 hover:text-green-400'
              >
                anis.inbox10@gmail.com
              </a>
            </p>
            <p className='text-sm'>
              <span className='font-semibold'>Phone:</span> (+92) 343 9275550
            </p>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-800 text-center text-sm'>
          <p>Developed with ♥ by Anisul</p>
          <p className='text-gray-500 mt-2'>
            &copy; {currentYear} Anisul Islam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
