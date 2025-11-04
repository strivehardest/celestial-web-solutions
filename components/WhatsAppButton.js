// components/WhatsAppButton.js
import { useState } from 'react';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const phoneNumber = "233530505031"; // wa.me expects country code + number without the plus
  const message = "Hi! I'm interested in your web development services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const containerStyle = {
    zIndex: 9999,
    width: '64px',
    height: '64px',
    position: 'fixed',
    bottom: '24px',
    right: '24px',
  };

  const anchorStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '64px',
    height: '64px',
    backgroundColor: isHovered ? '#ea580c' : '#f97316', // Orange-600 / Orange-500
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
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={anchorStyle}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>

        {/* Pulse overlay — pointerEvents none so it won't intercept clicks */}
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
            animation: 'cwsPulse 2s infinite',
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
            bottom: '86px',
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
          Chat with us on WhatsApp
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
        @keyframes cwsPulse {
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

export default WhatsAppButton;
