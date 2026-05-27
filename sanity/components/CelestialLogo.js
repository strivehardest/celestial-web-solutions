export default function CelestialLogo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0 4px',
    }}>
      <img
        src="/logo.png"
        alt="Celestial Web Solutions"
        style={{ height: '32px', width: 'auto' }}
      />
      <span style={{
        fontWeight: 700,
        fontSize: '15px',
        color: '#fff',
        letterSpacing: '-0.3px',
        lineHeight: 1,
      }}>
        Celestial <span style={{ color: '#F97316' }}>Web Solutions</span>
      </span>
    </div>
  )
}