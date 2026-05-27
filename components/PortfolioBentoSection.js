// PortfolioBentoSection.jsx
// Import with ssr:false in portfolio.js:
//   const PortfolioBentoSection = dynamic(() => import('../components/PortfolioBentoSection'), { ssr: false });

import { useState } from 'react';

const K  = '#569CD6';
const ST = '#CE9178';
const CM = '#6A9955';
const PU = '#C586C0';
const WH = '#D4D4D4';
const CY = '#4EC9B0';
const NM = '#9CDCFE';
const NU = '#B5CEA8';
const GR = '#4E4E4E';
const MONO = "'JetBrains Mono','Fira Code','Cascadia Code',monospace";

const codeLines = [
  [{t:"import ",c:PU},{t:"Image",c:CY},{t:" from ",c:PU},{t:"'next/image'",c:ST}],
  [{t:"import ",c:PU},{t:"{ motion }",c:CY},{t:" from ",c:PU},{t:"'framer-motion'",c:ST}],
  [{t:"import ",c:PU},{t:"Link",c:CY},{t:" from ",c:PU},{t:"'next/link'",c:ST}],
  [],
  [{t:"// Celestial Web Solutions — Portfolio Card",c:CM}],
  [{t:"const ",c:K},{t:"PortfolioCard",c:CY},{t:" = ({ ",c:WH},{t:"project, image, index",c:NM},{t:" }) => {",c:WH}],
  [{t:"  return (",c:WH}],
  [{t:"    <",c:WH},{t:"motion.div",c:CY},{t:" className",c:NM},{t:'="group relative"',c:ST}],
  [{t:"      initial",c:NM},{t:"={{ opacity: ",c:WH},{t:"0",c:NU},{t:", y: ",c:WH},{t:"24",c:NU},{t:" }}",c:WH}],
  [{t:"      whileInView",c:NM},{t:"={{ opacity: ",c:WH},{t:"1",c:NU},{t:", y: ",c:WH},{t:"0",c:NU},{t:" }}",c:WH}],
  [{t:"      transition",c:NM},{t:"={{ delay: index * ",c:WH},{t:"0.05",c:NU},{t:", duration: ",c:WH},{t:"0.5",c:NU},{t:" }}",c:WH}],
  [{t:"    >",c:WH}],
  [{t:"      <",c:WH},{t:"Link ",c:CY},{t:"href",c:NM},{t:"={`/portfolio/${project.slug}`}",c:WH},{t:">",c:WH}],
  [{t:"        <",c:WH},{t:"div ",c:CY},{t:"style",c:NM},{t:"={{ aspectRatio: ",c:WH},{t:"'3/4'",c:ST},{t:" }}>",c:WH}],
  [{t:"          <",c:WH},{t:"Image ",c:CY},{t:"src",c:NM},{t:"={image} ",c:WH},{t:"fill",c:NM}],
  [{t:"            className",c:NM},{t:'="object-cover object-top"',c:ST},{t:" />",c:WH}],
  [{t:"        </div>",c:WH}],
  [{t:"        <",c:WH},{t:"h3",c:CY},{t:">",c:WH},{t:"{project.title}",c:NM},{t:"</",c:WH},{t:"h3",c:CY},{t:">",c:WH}],
  [{t:"      </Link>",c:WH}],
  [{t:"    </motion.div>",c:WH}],
  [{t:"  );",c:WH}],
  [{t:"};",c:WH}],
  [],
  [{t:"export default ",c:K},{t:"PortfolioCard",c:CY},{t:";",c:WH}],
];

// simpleicons.org supports ?color= in URL — perfect for white/coloured SVGs on dark bg
// devicons used for logos that render well in full colour
const techStack = [
  {
    label:  'Next.js',
    color:  '#ffffff',
    bg:     'rgba(255,255,255,0.10)',
    // simpleicons with explicit white color — guaranteed visible on dark bg
    img:    'https://cdn.simpleicons.org/nextdotjs/ffffff',
  },
  {
    label:  'React',
    color:  '#61DAFB',
    bg:     'rgba(97,218,251,0.08)',
    img:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    label:  'Tailwind CSS',
    color:  '#38BDF8',
    bg:     'rgba(56,189,248,0.08)',
    img:    'https://cdn.simpleicons.org/tailwindcss/38BDF8',
  },
  {
    label:  'TypeScript',
    color:  '#3178C6',
    bg:     'rgba(49,120,198,0.10)',
    img:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    label:  'Node.js',
    color:  '#83CD29',
    bg:     'rgba(131,205,41,0.08)',
    img:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    label:  'WordPress',
    color:  '#21A1CB',
    bg:     'rgba(33,161,203,0.10)',
    // simpleicons with brand colour — avoids the black SVG problem
    img:    'https://cdn.simpleicons.org/wordpress/21A1CB',
  },
  {
    label:  'WooCommerce',
    color:  '#96588A',
    bg:     'rgba(150,88,138,0.10)',
    img:    'https://cdn.simpleicons.org/woocommerce/96588A',
  },
  {
    label:  'Figma',
    color:  '#F24E1E',
    bg:     'rgba(242,78,30,0.08)',
    img:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    label:  'GitHub',
    color:  '#ffffff',
    bg:     'rgba(255,255,255,0.08)',
    // simpleicons white — devicon github is black
    img:    'https://cdn.simpleicons.org/github/ffffff',
  },
  {
    label:  'Supabase',
    color:  '#3ECF8E',
    bg:     'rgba(62,207,142,0.08)',
    img:    'https://cdn.simpleicons.org/supabase/3ECF8E',
  },
  {
    label:  'Sanity CMS',
    color:  '#FF3E00',
    bg:     'rgba(255,62,0,0.08)',
    img:    'https://cdn.simpleicons.org/sanity/FF3E00',
  },
  {
    label:  'PostgreSQL',
    color:  '#336791',
    bg:     'rgba(51,103,145,0.10)',
    img:    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    label:  'Vercel',
    color:  '#000000',
    bg:     'rgba(0,0,0,0.08)',
    img:    'https://cdn.simpleicons.org/vercel/000000',
  },
  {
    label: 'Python',
    color: '#3776AB',
    bg: 'rgba(55,118,171,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    label: 'Django',
    color: '#092E20',
    bg: 'rgba(9,46,32,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
  },
  {
    label:'Framer Motion',
    color: '#FF008C',
    bg: 'rgba(255,0,140,0.08)',
    img: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg',
  }
];

export default function PortfolioBentoSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-gray-900 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Divider label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <span
            className="text-xs font-semibold tracking-widest text-orange-400 uppercase"
            style={{ fontFamily: "'Albert Sans', sans-serif" }}
          >
            Under the Hood
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Two equal cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* ── Card 1: Tech Stack ── */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-800/60 outline outline-1 outline-white/10 p-8 flex flex-col gap-6">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

            <div>
              <p className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                Tech Stack
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Tools We Build With
              </h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                Every Celestial Web Solutions project runs on a battle-tested stack — fast, scalable, and maintainable.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {techStack.map((tech) => {
                const isHov = hovered === tech.label;
                return (
                  <div
                    key={tech.label}
                    onMouseEnter={() => setHovered(tech.label)}
                    onMouseLeave={() => setHovered(null)}
                    className="flex flex-col items-center gap-2 cursor-default group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: isHov ? tech.bg : 'rgba(255,255,255,0.04)',
                        boxShadow: isHov ? `0 0 18px ${tech.color}50` : 'none',
                        border: '1px solid rgba(255,255,255,0.07)',
                      }}
                    >
                      <img
                        src={tech.img}
                        alt={tech.label}
                        style={{ width: 28, height: 28, objectFit: 'contain', display: 'block' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerHTML =
                              `<span style="color:${tech.color};font-size:15px;font-weight:700;font-family:sans-serif">${tech.label.charAt(0)}</span>`;
                          }
                        }}
                      />
                    </div>
                    <span
                      className="text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors text-center leading-tight"
                      style={{ fontFamily: "'Albert Sans', sans-serif" }}
                    >
                      {tech.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Card 2: Code Editor ── */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-800/60 outline outline-1 outline-white/10 flex flex-col">
            <div className="px-8 pt-8 pb-4 flex-shrink-0">
              <p className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                Clean Code
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Built With Precision
              </h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed" style={{ fontFamily: "'Albert Sans', sans-serif" }}>
                Readable, maintainable, and performant — from component to deployment.
              </p>
            </div>

            {/* Mini code editor */}
            <div className="flex-1 mx-4 mb-4 overflow-hidden rounded-xl outline outline-1 outline-white/10 shadow-2xl shadow-black/40 flex flex-col min-h-0">

              {/* Tab bar */}
              <div className="flex items-center flex-shrink-0" style={{ background: '#1e1e1e', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-1.5" style={{ padding: '10px 14px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
                </div>
                <div style={{
                  padding: '10px 18px',
                  fontSize: '11px',
                  fontFamily: MONO,
                  fontWeight: 500,
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.05)',
                  borderRight: '1px solid rgba(255,255,255,0.06)',
                  borderBottom: '2px solid #f97316',
                }}>
                  PortfolioCard.js
                </div>
              </div>

              {/* Code */}
              <div style={{ overflowY: 'auto', overflowX: 'auto', background: '#1e1e1e', maxHeight: '280px', scrollbarWidth: 'thin', scrollbarColor: '#374151 #1e1e1e' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <tbody>
                    {codeLines.map((tokens, i) => (
                      <tr key={i} style={{ lineHeight: '20px' }}>
                        <td style={{ color: GR, fontSize: '11px', fontFamily: MONO, textAlign: 'right', paddingRight: '12px', paddingLeft: '14px', minWidth: '40px', userSelect: 'none', verticalAlign: 'top', borderRight: '1px solid #2a2a2a', whiteSpace: 'nowrap' }}>
                          {i + 1}
                        </td>
                        <td style={{ paddingLeft: '16px', paddingRight: '24px', fontFamily: MONO, fontSize: '11.5px', whiteSpace: 'pre', verticalAlign: 'top' }}>
                          {tokens && tokens.length > 0
                            ? tokens.map((tok, j) => <span key={j} style={{ color: tok.c }}>{tok.t}</span>)
                            : <span style={{ color: WH }}>&nbsp;</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fade */}
              <div style={{ height: 40, background: 'linear-gradient(to top, #1e1e1e, transparent)', marginTop: -40, position: 'relative', zIndex: 10, pointerEvents: 'none', flexShrink: 0 }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}