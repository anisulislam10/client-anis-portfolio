import { useEffect } from 'react';

const TopAd = () => {
  useEffect(() => {
    // Create and attach the <script> for atOptions
    const atScript = document.createElement('script');
    atScript.type = 'text/javascript';
    atScript.innerHTML = `
      atOptions = {
        'key' : '20c902e99801d81bb399d22f582b2024',
        'format' : 'iframe',
        'height' : 300,
        'width' : 160,
        'params' : {}
      };
    `;
    document.body.appendChild(atScript);

    // Create and attach the invoke.js loader
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/20c902e99801d81bb399d22f582b2024/invoke.js';
    invokeScript.async = true;
    document.body.appendChild(invokeScript);

    // Optional: cleanup if component unmounts
    return () => {
      document.body.removeChild(atScript);
      document.body.removeChild(invokeScript);
    };
  }, []);

  return (
    <div
      id="container-20c902e99801d81bb399d22f582b2024"
      style={{ width: '160px', height: '300px', backgroundColor: '#f3f4f6' }}
    ></div>
  );
};

export default TopAd;
