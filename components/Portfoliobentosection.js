// PortfolioBentoSection.jsx
// TWO cards only: Tech Stack (external images) + Built With Clean Code
// Import: import PortfolioBentoSection from '../components/PortfolioBentoSection';

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
  [{t:"// Celestial Web Solutions Portfolio Card",c:CM}],
  [{t:"const ",c:K},{t:"PortfolioCard",c:CY},{t:" = ({ ",c:WH},{t:"project, image, index",c:NM},{t:" }) => {",c:WH}],
  [{t:"  return (",c:WH}],
  [{t:"    <",c:WH},{t:"motion.div",c:CY},{t:" className",c:NM},{t:'="group relative"',c:ST}],
  [{t:"      initial",c:NM},{t:"={{ opacity: ",c:WH},{t:"0",c:NU},{t:", y: ",c:WH},{t:"24",c:NU},{t:" }}",c:WH}],
  [{t:"      whileInView",c:NM},{t:"={{ opacity: ",c:WH},{t:"1",c:NU},{t:", y: ",c:WH},{t:"0",c:NU},{t:" }}",c:WH}],
  [{t:"      transition",c:NM},{t:"={{ delay: index * ",c:WH},{t:"0.05",c:NU},{t:", duration: ",c:WH},{t:"0.5",c:NU},{t:" }}",c:WH}],
  [{t:"    >",c:WH}],
  [{t:"      <",c:WH},{t:"Link ",c:CY},{t:"href",c:NM},{t:"={`/portfolio/${project.slug}`}",c:WH}],
  [{t:"        className",c:NM},{t:'="absolute inset-0 z-10"',c:ST},{t:" />",c:WH}],
  [{t:"      <",c:WH},{t:"div ",c:CY},{t:"style",c:NM},{t:"={{ aspectRatio: ",c:WH},{t:"'3/4'",c:ST},{t:" }}>",c:WH}],
  [{t:"        <",c:WH},{t:"Image ",c:CY},{t:"src",c:NM},{t:"={image} ",c:WH},{t:"fill",c:NM}],
  [{t:"          className",c:NM},{t:'="object-cover object-top"',c:ST},{t:" />",c:WH}],
  [{t:"      </div>",c:WH}],
  [{t:"      <",c:WH},{t:"h3",c:CY},{t:">",c:WH},{t:"{project.title}",c:NM},{t:"</",c:WH},{t:"h3",c:CY},{t:">",c:WH}],
  [{t:"    </motion.div>",c:WH}],
  [{t:"  );",c:WH}],
  [{t:"};",c:WH}],
  [],
  [{t:"export default ",c:K},{t:"PortfolioCard",c:CY},{t:";",c:WH}],
];

const techStack = [
  {
    label: 'Next.js',
    color: '#ffffff',
    bg: 'rgba(255,255,255,0.06)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  },
  {
    label: 'React',
    color: '#61DAFB',
    bg: 'rgba(97,218,251,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    label: 'Tailwind CSS',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    label: 'TypeScript',
    color: '#3178C6',
    bg: 'rgba(49,120,198,0.10)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    label: 'Node.js',
    color: '#83CD29',
    bg: 'rgba(131,205,41,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    label: 'WordPress',
    color: '#21759B',
    bg: 'rgba(33,117,155,0.10)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
  },
  {
    label: 'WooCommerce',
    color: '#96588A',
    bg: 'rgba(150,88,138,0.10)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/woocommerce/woocommerce-original.svg',
  },
  {
    label: 'Figma',
    color: '#F24E1E',
    bg: 'rgba(242,78,30,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    label: 'GitHub',
    color: '#181717',
    bg: 'rgba(24,23,23,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
  {
    label:' Supabase',
    color: '#3ECF8E',
    bg: 'rgba(62,207,142,0.08)',
    img: '/portfolio/desktop/supabase.webp',
  },
  {
    label: 'Sanity CMS',
    color: '#FF3E00',
    bg: 'rgba(255,62,0,0.08)',
    img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sanity/sanity-original.svg',
  }
];

export default function PortfolioBentoSection() {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <section className="bg-gray-900 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Section label */}
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

        {/* TWO cards only */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* ── Card 1: Tech Stack ── */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-800/60 outline outline-1 outline-white/10 p-8 flex flex-col gap-6">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

            <div>
              <p
                className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-2"
                style={{ fontFamily: "'Albert Sans', sans-serif" }}
              >
                Tech Stack
              </p>
              <h3
                className="text-2xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Tools We Build With
              </h3>
              <p
                className="mt-2 text-sm text-gray-400 leading-relaxed"
                style={{ fontFamily: "'Albert Sans', sans-serif" }}
              >
                Every project is built on a battle-tested stack — fast, scalable, and maintainable.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {techStack.map((tech) => (
                <div
                  key={tech.label}
                  onMouseEnter={() => setHoveredTech(tech.label)}
                  onMouseLeave={() => setHoveredTech(null)}
                  className="group flex flex-col items-center gap-2 cursor-default"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: hoveredTech === tech.label ? tech.bg : 'rgba(255,255,255,0.04)',
                      boxShadow: hoveredTech === tech.label ? `0 0 20px ${tech.color}40` : 'none',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <img
                      src={tech.img}
                      alt={tech.label}
                      className="w-7 h-7 object-contain"
                      style={{
                        filter: tech.label === 'Next.js'
                          ? 'brightness(0) invert(1)'
                          : tech.label === 'WordPress'
                          ? 'brightness(0) saturate(100%) invert(38%) sepia(63%) saturate(400%) hue-rotate(170deg)'
                          : 'none',
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
              ))}
            </div>
          </div>

          {/* ── Card 2: Built With Clean Code ── */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-800/60 outline outline-1 outline-white/10 flex flex-col">
            <div className="px-8 pt-8 pb-4 flex-shrink-0">
              <p
                className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-2"
                style={{ fontFamily: "'Albert Sans', sans-serif" }}
              >
                Clean Code
              </p>
              <h3
                className="text-2xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                Built With Precision
              </h3>
              <p
                className="mt-2 text-sm text-gray-400 leading-relaxed"
                style={{ fontFamily: "'Albert Sans', sans-serif" }}
              >
                Readable, maintainable, and performant — from component to deployment.
              </p>
            </div>

            {/* Mini code editor */}
            <div className="flex-1 mx-4 mb-4 overflow-hidden rounded-xl outline outline-1 outline-white/10 shadow-2xl shadow-black/40 flex flex-col">
              {/* Editor top bar */}
              <div className="flex items-center bg-[#1e1e1e] border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-2.5 border-r border-white/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div
                  className="px-4 py-2.5 text-[11px] font-medium text-white bg-[#1f2937] border-r border-white/10 border-b-2 border-b-orange-500"
                  style={{ fontFamily: MONO }}
                >
                  PortfolioCard.jsx
                </div>
              </div>

              {/* Code lines */}
              <div
                className="overflow-auto bg-[#1e1e1e] flex-1"
                style={{ maxHeight: '260px', scrollbarWidth: 'thin', scrollbarColor: '#374151 #1e1e1e' }}
              >
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <tbody>
                    {codeLines.map((tokens, i) => (
                      <tr
                        key={i}
                        style={{ lineHeight: '20px' }}
                        className="hover:bg-white/[0.025] transition-colors"
                      >
                        <td style={{
                          color: GR, fontSize: '11px', fontFamily: MONO,
                          textAlign: 'right', paddingRight: '14px', paddingLeft: '16px',
                          minWidth: '44px', userSelect: 'none', verticalAlign: 'top',
                          borderRight: '1px solid #2d2d2d', whiteSpace: 'nowrap',
                        }}>
                          {i + 1}
                        </td>
                        <td style={{
                          paddingLeft: '16px', paddingRight: '24px',
                          fontFamily: MONO, fontSize: '11.5px', whiteSpace: 'pre',
                          verticalAlign: 'top',
                        }}>
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

              {/* Bottom fade */}
              <div className="h-8 bg-gradient-to-t from-[#1e1e1e] to-transparent -mt-8 pointer-events-none relative z-10 flex-shrink-0" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}