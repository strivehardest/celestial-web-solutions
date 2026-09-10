import Image from 'next/image';

/**
 * Brand mark for Celestial AI: company logo inside an orbital ring,
 * with a small star node so it reads as an AI assistant rather than
 * the plain site favicon.
 */
export default function CelestialAIMark({ size = 'lg', className = '' }) {
  const isLg = size === 'lg';
  const isMd = size === 'md';
  const box = isLg ? 'h-[5.25rem] w-[5.25rem]' : isMd ? 'h-12 w-12' : 'h-9 w-9';
  const logo = isLg ? 58 : isMd ? 34 : 24;
  const ring = isLg ? 'inset-[-8px]' : isMd ? 'inset-[-5px]' : 'inset-[-4px]';
  const node = isLg
    ? 'right-[-2px] top-[-2px] h-6 w-6'
    : isMd
      ? 'right-[-2px] top-[-2px] h-4 w-4'
      : 'right-[-3px] top-[-3px] h-3.5 w-3.5';
  const star = isLg ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5';

  return (
    <span
      className={`celestial-ai-mark relative inline-flex ${box} items-center justify-center ${className}`}
      role="img"
      aria-label="Celestial AI"
    >
      <span className={`celestial-ai-mark-orbit pointer-events-none absolute ${ring} rounded-full`} />
      <span
        className={`relative z-[1] inline-flex ${box} items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-white to-orange-50 shadow-[0_10px_28px_rgba(249,115,22,0.28)] ring-2 ring-orange-300/70 dark:from-gray-950 dark:to-gray-900 dark:ring-orange-400/50`}
      >
        <Image
          src="/logo.png"
          alt=""
          width={logo}
          height={logo}
          className="object-contain"
          priority={isLg}
        />
      </span>
      <span
        className={`absolute z-[2] inline-flex items-center justify-center rounded-full bg-orange-500 shadow-md shadow-orange-500/50 ring-2 ring-white dark:ring-gray-950 ${node}`}
      >
        <svg viewBox="0 0 24 24" className={`${star} text-white`} fill="currentColor" aria-hidden="true">
          <path d="M12 2.2l2.1 5.7 6.1.4-4.7 3.8 1.6 5.9L12 14.8 7 18l1.6-5.9L3.8 8.3l6.1-.4L12 2.2z" />
        </svg>
      </span>
    </span>
  );
}
