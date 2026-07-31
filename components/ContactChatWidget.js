import { useEffect, useId, useRef, useState } from 'react';

const WHATSAPP_NUMBER = '233245709341';
const PHONE_NUMBER = '+233530505031';
const WHATSAPP_MESSAGE = "Hi! I'm interested in your web development services.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const PHONE_HREF = `tel:${PHONE_NUMBER}`;

let activeInstanceId = null;

export default function ContactChatWidget() {
  const instanceId = useId();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (activeInstanceId === null) {
      activeInstanceId = instanceId;
      setIsMounted(true);
    }

    return () => {
      if (activeInstanceId === instanceId) {
        activeInstanceId = null;
      }
    };
  }, [instanceId]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    const onPointerDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      ref={panelRef}
      className="cws-chat-widget"
      style={{
        position: 'fixed',
        right: '20px',
        bottom: '20px',
        zIndex: 9999,
        fontFamily: 'Albert Sans, sans-serif',
      }}
    >
      {isOpen && (
        <div
          role="dialog"
          aria-label="Contact Celestial Web Solutions"
          style={{
            position: 'absolute',
            right: 0,
            bottom: '76px',
            width: 'min(320px, calc(100vw - 32px))',
            borderRadius: '18px',
            overflow: 'hidden',
            background: '#ffffff',
            boxShadow: '0 22px 50px rgba(15, 23, 42, 0.28)',
            border: '1px solid rgba(249, 115, 22, 0.18)',
            animation: 'cwsChatPanelIn 180ms ease-out',
          }}
        >
          <div
            style={{
              position: 'relative',
              padding: '18px 18px 20px',
              color: '#fff',
              background:
                'linear-gradient(145deg, rgba(234, 88, 12, 0.94) 0%, rgba(249, 115, 22, 0.92) 48%, rgba(194, 65, 12, 0.96) 100%)',
              overflow: 'hidden',
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/logo-white.webp)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right -8px center',
                backgroundSize: '140px',
                opacity: 0.16,
                pointerEvents: 'none',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at top left, rgba(255,255,255,0.22), transparent 46%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.12)',
                }}
              >
                <img
                  src="/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                />
              </div>

              <div style={{ minWidth: 0, flex: 1, paddingTop: '2px' }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '15px',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    fontFamily: 'Bricolage Grotesque, sans-serif',
                  }}
                >
                  Celestial Web Solutions
                </p>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>
                  Hi there — how can we help your project today?
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat menu"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '999px',
                  border: 'none',
                  background: 'rgba(255,255,255,0.16)',
                  color: '#fff',
                  cursor: 'pointer',
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ padding: '14px' }}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: '14px',
                textDecoration: 'none',
                color: '#111827',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = '#fff7ed';
                event.currentTarget.style.borderColor = '#fdba74';
                event.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = '#f8fafc';
                event.currentTarget.style.borderColor = '#e2e8f0';
                event.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: '#25D366',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: 700 }}>WhatsApp</span>
                <span style={{ display: 'block', marginTop: '2px', fontSize: '12px', color: '#64748b' }}>
                  Chat with us instantly
                </span>
              </span>
            </a>

            <a
              href={PHONE_HREF}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                marginTop: '10px',
                borderRadius: '14px',
                textDecoration: 'none',
                color: '#111827',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                transition: 'background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = '#fff7ed';
                event.currentTarget.style.borderColor = '#fdba74';
                event.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = '#f8fafc';
                event.currentTarget.style.borderColor = '#e2e8f0';
                event.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: '#f97316',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: 700 }}>Call us</span>
                <span style={{ display: 'block', marginTop: '2px', fontSize: '12px', color: '#64748b' }}>
                  {PHONE_NUMBER}
                </span>
              </span>
            </a>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close chat menu' : 'Open chat menu'}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          background: isOpen
            ? 'linear-gradient(145deg, #ea580c 0%, #c2410c 100%)'
            : 'linear-gradient(145deg, #fb923c 0%, #f97316 55%, #ea580c 100%)',
          boxShadow: '0 14px 30px rgba(249, 115, 22, 0.42)',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
          event.currentTarget.style.boxShadow = '0 18px 34px rgba(249, 115, 22, 0.48)';
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = 'translateY(0) scale(1)';
          event.currentTarget.style.boxShadow = '0 14px 30px rgba(249, 115, 22, 0.42)';
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'rgba(251, 146, 60, 0.35)',
            animation: 'cwsChatPulse 2s infinite',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z" />
            <circle cx="8" cy="10" r="1.2" />
            <circle cx="12" cy="10" r="1.2" />
            <circle cx="16" cy="10" r="1.2" />
          </svg>
        )}
      </button>

      <style jsx global>{`
        @keyframes cwsChatPulse {
          0% {
            transform: scale(0.92);
            opacity: 0.75;
          }
          100% {
            transform: scale(1.55);
            opacity: 0;
          }
        }

        @keyframes cwsChatPanelIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
