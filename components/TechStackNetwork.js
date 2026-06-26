import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Zap, Shield, Layers, ArrowRightLeft, FolderKanban, Cpu, Clock, Timer, Code2 } from 'lucide-react';

const stackLayers = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Interfaces users love — fast, responsive, and SEO-ready.',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    description: 'Secure APIs, real-time data, and scalable infrastructure.',
    tools: ['Node.js', 'Supabase', 'MongoDB', 'Django'],
  },
  {
    id: 'content',
    label: 'Content & CMS',
    description: 'Headless CMS so your team updates content without code.',
    tools: ['Sanity CMS', 'WordPress'],
  },
  {
    id: 'commerce',
    label: 'Commerce & Pay',
    description: 'Checkout, subscriptions, and Ghana-ready payment rails.',
    tools: ['Paystack', 'Flutterwave', 'Shopify', 'WooCommerce'],
  },
];

const techNodes = [
  { name: 'Next.js', icon: '/images/tech/nextjs.svg', x: 50, y: 14, size: 50, layer: 'frontend' },
  { name: 'React', icon: '/images/tech/react.svg', x: 18, y: 32, size: 44, layer: 'frontend' },
  { name: 'TypeScript', icon: '/images/tech/typescript.svg', x: 82, y: 30, size: 44, layer: 'frontend' },
  { name: 'Tailwind', icon: '/images/tailwindcss-logo.png', x: 12, y: 58, size: 42, layer: 'frontend' },
  { name: 'Supabase', icon: '/images/tech/supabase.svg', x: 86, y: 56, size: 44, layer: 'backend' },
  { name: 'Node.js', icon: '/images/tech/nodejs.svg', x: 50, y: 82, size: 42, layer: 'backend' },
  { name: 'Sanity CMS', icon: '/images/tech/sanity.svg', x: 30, y: 72, size: 44, layer: 'content' },
  { name: 'Paystack', icon: '/images/paystack-logo.png', x: 70, y: 74, size: 44, layer: 'commerce' },
];

const connections = [
  { d: 'M 400 88 Q 260 160 190 175', delay: 0 },
  { d: 'M 400 88 Q 540 160 610 165', delay: 0.1 },
  { d: 'M 400 88 Q 120 260 130 310', delay: 0.15 },
  { d: 'M 400 88 Q 680 260 670 310', delay: 0.2 },
  { d: 'M 190 175 Q 280 240 260 310', delay: 0.25 },
  { d: 'M 610 165 Q 520 240 540 310', delay: 0.3 },
  { d: 'M 260 310 Q 400 340 400 400', delay: 0.35 },
  { d: 'M 540 310 Q 400 340 400 400', delay: 0.4 },
  { d: 'M 400 88 Q 400 220 400 400', delay: 0.05 },
];

const callouts = [
  {
    side: 'left',
    position: 'top',
    icon: Zap,
    stat: '3× faster delivery',
    body: 'Next.js & React ship production sites in weeks — not months. SSR, static generation, and edge-ready by default.',
  },
  {
    side: 'left',
    position: 'bottom',
    icon: Shield,
    stat: 'Secure from day one',
    body: 'Supabase auth, row-level security, and Paystack PCI-compliant checkout — built into every project we deliver.',
  },
  {
    side: 'right',
    position: 'top',
    icon: Layers,
    stat: 'Headless & flexible',
    body: 'Sanity CMS powers content for COPTI, Kafui Dey & more — your team edits, we handle the architecture.',
  },
  {
    side: 'right',
    position: 'bottom',
    icon: ArrowRightLeft,
    stat: 'Ghana to global',
    body: 'Paystack & Flutterwave for local payments, Vercel & Supabase for worldwide performance — one stack, every market.',
  },
];

const stats = [
  { value: '20+', label: 'Projects shipped', icon: FolderKanban },
  { value: '15+', label: 'Technologies', icon: Cpu },
  { value: '4', label: 'Stack layers', icon: Layers },
  { value: '2 wk', label: 'Avg. MVP timeline', icon: Clock },
  { value: '10k+', label: 'Hours of work', icon: Timer },
  { value: '500k+', label: 'Lines of code', icon: Code2 },
];

const globeDots = [
  [310, 165], [340, 148], [370, 158], [400, 142], [430, 152], [460, 145], [490, 168],
  [295, 195], [325, 215], [355, 205], [385, 218], [415, 208], [445, 220], [475, 212], [505, 198],
  [280, 240], [310, 258], [345, 248], [375, 262], [425, 255], [455, 268], [485, 252], [515, 245],
  [300, 285], [335, 298], [370, 288], [400, 302], [430, 292], [465, 305], [495, 290],
  [320, 325], [360, 338], [400, 345], [440, 332], [480, 340],
  [350, 365], [400, 372], [450, 360],
];

function BracketCallout({ stat, body, side, position, icon: Icon }) {
  const isLeft = side === 'left';
  const isTop = position === 'top';

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -28 : 28, y: isTop ? -12 : 12 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.25 }}
      className={`hidden xl:block absolute w-52 2xl:w-60 ${
        isLeft ? 'left-0 2xl:left-2' : 'right-0 2xl:right-2'
      } ${isTop ? 'top-[8%]' : 'bottom-[8%]'}`}
    >
      <div className="relative px-4 py-3.5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg">
        <span
          className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} w-6 h-6 border-t-2 ${
            isLeft ? 'border-l-2' : 'border-r-2'
          } border-orange-500`}
          aria-hidden
        />
        <span
          className={`absolute bottom-0 ${isLeft ? 'right-0' : 'left-0'} w-6 h-6 border-b-2 ${
            isLeft ? 'border-r-2' : 'border-l-2'
          } border-orange-500`}
          aria-hidden
        />
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          </div>
          <p
            className="text-base font-bold text-gray-900 dark:text-white leading-snug"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            {stat}
          </p>
        </div>
        <p
          className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed"
          style={{ fontFamily: 'Albert Sans, sans-serif' }}
        >
          {body}
        </p>
      </div>
    </motion.div>
  );
}

function GlobeSvg({ activeLayer }) {
  const cx = 400;
  const cy = 248;
  const r = 168;

  const latLines = [-75, -45, -15, 15, 45, 75];
  const lonLines = [0, 22, 45, 67, 90, 112, 135, 157];

  return (
    <svg viewBox="0 0 800 480" className="w-full h-full" aria-hidden preserveAspectRatio="xMidYMid meet">
      {[1, 1.15, 1.3].map((scale, i) => (
        <motion.circle
          key={`pulse-${i}`}
          cx={cx}
          cy={cy}
          r={r * scale}
          fill="none"
          stroke="#f97316"
          strokeWidth="1"
          opacity={0.15 - i * 0.04}
          animate={{ r: [r * scale, r * scale + 12, r * scale], opacity: [0.12, 0.04, 0.12] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {latLines.map((lat) => {
          const ry = r * Math.cos((lat * Math.PI) / 180);
          const y = cy + r * Math.sin((lat * Math.PI) / 180) * 0.12;
          return (
            <ellipse
              key={`lat-${lat}`}
              cx={cx}
              cy={y}
              rx={r}
              ry={Math.max(ry * 0.52, 6)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-300 dark:text-gray-600"
              opacity="0.65"
            />
          );
        })}
        {lonLines.map((lon) => (
          <ellipse
            key={`lon-${lon}`}
            cx={cx}
            cy={cy}
            rx={r * Math.abs(Math.sin((lon * Math.PI) / 180))}
            ry={r}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-300 dark:text-gray-600"
            opacity="0.45"
            transform={`rotate(${lon} ${cx} ${cy})`}
          />
        ))}
      </motion.g>

      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-gray-300 dark:text-gray-600"
        opacity="0.85"
      />

      {globeDots.map(([dx, dy], i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={dx}
          cy={dy}
          r={2 + (i % 2)}
          fill="#f97316"
          opacity={0.25 + (i % 4) * 0.12}
          animate={{ opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 2 + (i % 5) * 0.4, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}

      {connections.map(({ d, delay }, i) => (
        <g key={`arc-${i}`}>
          <motion.path
            d={d}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: activeLayer ? 0.35 : 0.65 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.15 + delay, ease: 'easeOut' }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke="#f97316"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 20"
            opacity="0.35"
            animate={{ strokeDashoffset: [0, -48] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: delay * 2 }}
          />
        </g>
      ))}
    </svg>
  );
}

function TechNodeBadge({ node, isActive, onActivate, onDeactivate, compact = false }) {
  return (
    <motion.div
      className={compact ? 'flex flex-col items-center gap-1' : 'flex flex-col items-center gap-1.5'}
      whileHover={compact ? undefined : { scale: 1.1, y: -5 }}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onTouchStart={onActivate}
      onTouchEnd={onDeactivate}
    >
      <div
        className={`rounded-xl bg-white dark:bg-gray-800 border shadow-md flex items-center justify-center transition-all duration-300 ${
          isActive
            ? 'border-orange-300 dark:border-orange-600 shadow-orange-500/20'
            : 'border-gray-200 dark:border-gray-700'
        } ${compact ? 'p-1.5' : 'p-2 shadow-lg'}`}
        style={{ width: compact ? 40 : node.size, height: compact ? 40 : node.size }}
      >
        <Image
          src={node.icon}
          alt={node.name}
          width={compact ? 26 : node.size - 14}
          height={compact ? 26 : node.size - 14}
          className="object-contain"
        />
      </div>
      <span
        className={`font-semibold text-gray-700 dark:text-gray-300 text-center bg-white/90 dark:bg-gray-900/90 px-1.5 py-0.5 rounded-full backdrop-blur-sm border border-gray-100 dark:border-gray-700 ${
          compact ? 'text-[8px] leading-tight max-w-[4.5rem] truncate' : 'text-[9px] sm:text-[10px] whitespace-nowrap px-2'
        }`}
        style={{ fontFamily: 'Albert Sans, sans-serif' }}
      >
        {node.name}
      </span>
    </motion.div>
  );
}

export default function TechStackNetwork() {
  const [activeLayer, setActiveLayer] = useState(null);
  const activeMeta = stackLayers.find((l) => l.id === activeLayer);

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-12 lg:mb-16">
      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 lg:mb-10"
      >
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
          <div
            key={s.label}
            className="text-center px-3 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm"
          >
            <div className="flex justify-center mb-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" strokeWidth={2} />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-2xl sm:text-3xl font-bold text-orange-600 dark:text-orange-400"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              {s.value}
            </motion.p>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              {s.label}
            </p>
          </div>
          );
        })}
      </motion.div>

      {/* Globe visualization — desktop: floating nodes; mobile/tablet: stacked layout */}
      <div className="relative mx-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden lg:aspect-[16/10] lg:min-h-[460px]">
        {callouts.map((c) => (
          <BracketCallout key={`${c.side}-${c.position}`} {...c} />
        ))}

        {/* Desktop: globe + positioned nodes */}
        <div className="hidden lg:block absolute inset-0 xl:px-32 2xl:px-40 pt-4 pb-8">
          <GlobeSvg activeLayer={activeLayer} />

          {techNodes.map((node, i) => {
            const isActive = !activeLayer || node.layer === activeLayer;
            return (
              <motion.div
                key={node.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.12 + i * 0.06 }}
                animate={{ opacity: isActive ? 1 : 0.25, scale: isActive ? 1 : 0.9 }}
              >
                <TechNodeBadge
                  node={node}
                  isActive={isActive}
                  onActivate={() => setActiveLayer(node.layer)}
                  onDeactivate={() => setActiveLayer(null)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & tablet: globe on top, tech grid below */}
        <div className="lg:hidden px-4 py-6 sm:px-6 sm:py-8">
          <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] mb-6">
            <GlobeSvg activeLayer={activeLayer} />
          </div>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:gap-4 max-w-lg mx-auto">
            {techNodes.map((node) => {
              const isActive = !activeLayer || node.layer === activeLayer;
              return (
                <motion.div
                  key={node.name}
                  className="flex justify-center"
                  animate={{ opacity: isActive ? 1 : 0.35, scale: isActive ? 1 : 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <TechNodeBadge
                    node={node}
                    isActive={isActive}
                    compact
                    onActivate={() => setActiveLayer(node.layer)}
                    onDeactivate={() => setActiveLayer(null)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile / tablet callouts */}
      <div className="xl:hidden grid sm:grid-cols-2 gap-3 mt-5">
        {callouts.map((c) => (
          <div
            key={`${c.side}-${c.position}`}
            className="flex gap-3 px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/90 dark:bg-gray-800/60"
          >
            <div className="w-8 h-8 shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
              <c.icon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                {c.stat}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                {c.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Layer cards */}
      <div className="mt-8 lg:mt-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 mb-5"
          style={{ fontFamily: 'Albert Sans, sans-serif' }}
        >
          <span className="lg:hidden">Tap a layer to highlight its tools</span>
          <span className="hidden lg:inline">Hover a layer to highlight its tools on the network</span>
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stackLayers.map((layer, i) => (
            <motion.button
              key={layer.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onMouseEnter={() => setActiveLayer(layer.id)}
              onMouseLeave={() => setActiveLayer(null)}
              onClick={() => setActiveLayer((prev) => (prev === layer.id ? null : layer.id))}
              onFocus={() => setActiveLayer(layer.id)}
              onBlur={() => setActiveLayer(null)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                activeLayer === layer.id
                  ? 'border-orange-400 dark:border-orange-600 bg-orange-50/80 dark:bg-orange-950/30 shadow-lg shadow-orange-500/10 scale-[1.02]'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/60 hover:border-orange-200 dark:hover:border-orange-800'
              }`}
            >
              <div className="h-1 w-10 rounded-full bg-orange-500 mb-3" />
              <h3
                className="text-sm font-bold text-gray-900 dark:text-white mb-1.5"
                style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
              >
                {layer.label}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                {layer.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {layer.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium"
                    style={{ fontFamily: 'Albert Sans, sans-serif' }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active layer detail bar */}
      <AnimatePresence>
        {activeMeta && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              Highlighting {activeMeta.label} — {activeMeta.tools.join(', ')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
