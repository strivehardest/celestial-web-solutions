// components/PhoneCallButton.js
import { useState } from 'react';

const PhoneCallButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "+233530505031";
  const phoneHref = `tel:${phoneNumber}`;

  const containerStyle = {
    zIndex: 9999,
    width: '64px',
    height: '64px',
    position: 'fixed',
    bottom: '104px', // sits directly above the WhatsApp button (24px + 64px + 16px gap)
    right: '24px',
  };

  const anchorStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: isHovered ? '#ea580c' : '#f97316',
    borderRadius: '50%',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
    transition: 'transform 0.18s ease, background-color 0.18s ease',
    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'visible',
  };

  return (
    <div style={containerStyle} aria-hidden={false}>
      <a
        href={phoneHref}
        aria-label="Call us now"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={anchorStyle}
      >
        {/* Phone icon */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
        >
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>

        {/* Pulse overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            backgroundColor: '#fb923c',
            opacity: 0.28,
            animation: 'cwsPhonePulse 2s infinite',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      </a>

      {/* Tooltip */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '76px',
            right: '0',
            backgroundColor: '#111827',
            color: 'white',
            fontSize: '14px',
            padding: '8px 12px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            zIndex: 10000,
          }}
          role="status"
        >
          Call us: {phoneNumber}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: '16px',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #111827',
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes cwsPhonePulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PhoneCallButton;