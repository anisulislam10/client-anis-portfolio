// src/components/TopAd.jsx
import { useEffect, useState } from 'react';

const TopAd = ({ asPopup = false }) => {
  const [visible, setVisible] = useState(asPopup);

  useEffect(() => {
    window.atOptions = {
      key: '20c902e99801d81bb399d22f582b2024',
      format: 'iframe',
      height: 300,
      width: 160,
      params: {}
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//www.highperformanceformat.com/20c902e99801d81bb399d22f582b2024/invoke.js';
    script.async = true;

    const adContainer = document.getElementById('ad-container');
    if (adContainer) {
      adContainer.innerHTML = ''; // clear on re-render
      adContainer.appendChild(script);
    }
  }, []);

  if (asPopup && !visible) return null;

  return (
    <div
      className={`${asPopup ? 'fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]' : ''}`}
    >
      <div
        className={`relative ${asPopup ? 'bg-gray-900 rounded-xl p-4 shadow-lg' : ''}`}
        style={{
          width: '160px',
          textAlign: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <p style={{ fontSize: '12px', color: '#ffffff', marginBottom: '5px' }}>
          This is Ad @Adsterra
        </p>
        <div
          id="ad-container"
          style={{
            width: '160px',
            height: '300px',
            backgroundColor: '#f3f4f6',
            overflow: 'hidden',
          }}
        ></div>

        {asPopup && (
          <button
            onClick={() => setVisible(false)}
            className="absolute top-1 right-1 text-white bg-red-600 hover:bg-red-700 rounded-full px-2 text-sm"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default TopAd;
