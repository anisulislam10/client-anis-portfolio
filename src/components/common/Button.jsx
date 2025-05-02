const Button = ({ href, text, isSecondary = false, isSmall = false, ...props }) => {
    const baseClasses = "font-medium rounded-full transition-colors duration-300";
    const sizeClasses = isSmall ? "px-4 py-2 text-sm" : "px-6 py-3";
    const colorClasses = isSecondary
      ? "bg-transparent border border-accent text-accent hover:bg-accent hover:text-primary"
      : "bg-accent text-primary hover:bg-accent/90";
  
    if (href) {
      return (
        <a
          href={href}
          className={`${baseClasses} ${sizeClasses} ${colorClasses}`}
          {...props}
        >
          {text}
        </a>
      );
    }
  
    return (
      <button
        type={props.type || "button"}
        className={`${baseClasses} ${sizeClasses} ${colorClasses}`}
        {...props}
      >
        {text}
      </button>
    );
  };
  
  export default Button;