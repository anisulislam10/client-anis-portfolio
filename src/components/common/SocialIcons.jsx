import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const SocialIcons = ({ className = '' }) => {
  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/username" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/username" },
    { icon: <FaTwitter />, url: "https://twitter.com/username" },
    { icon: <FaEnvelope />, url: "mailto:john.doe@example.com" },
  ];

  return (
    <div className={`flex space-x-4 ${className}`}>
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-accent transition-colors"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;