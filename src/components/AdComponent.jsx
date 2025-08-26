import { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    configScript.innerHTML = `
      atOptions = {
        'key': '20c902e99801d81bb399d22f582b2024',
        'format': 'iframe',
        'height': 300,
        'width': 160,
        'params': {}
      };
    `;
    document.body.appendChild(configScript);

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/20c902e99801d81bb399d22f582b2024/invoke.js';
    document.body.appendChild(invokeScript);
  }, []);

  return (
    <div style={{ width: '160px', height: '300px', margin: 'auto', paddingTop: '10px' }}>
      <div id="container-20c902e99801d81bb399d22f582b2024"></div>
    </div>
  );
};

export default AdComponent;
