import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Zap, Shield, Layers, ArrowRightLeft, FolderKanban, Cpu, Clock, Timer, Code2 } from 'lucide-react';

const InteractiveTechGlobe = dynamic(() => import('./InteractiveTechGlobe'), { ssr: false });

const stackLayers = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Interfaces users love — fast, responsive, and SEO-ready.',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    id: 'backend',
    label: 'Backend & Data',
    description: 'Secure APIs, real-time data, and scalable infrastructure.',
    tools: ['Node.js', 'Supabase', 'MongoDB', 'Python', 'Django'],
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
  {
    id: 'design',
    label: 'Design & Tools',
    description: 'Design systems and dev tools for polished workflows.',
    tools: ['Figma', 'Tailwind', 'Sanity CMS', 'WordPress'],
  },
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
  { value: '19', label: 'Technologies', icon: Cpu },
  { value: '5', label: 'Stack layers', icon: Layers },
  { value: '2 wk', label: 'Avg. MVP timeline', icon: Clock },
  { value: '10k+', label: 'Hours of work', icon: Timer },
  { value: '500k+', label: 'Lines of code', icon: Code2 },
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

export default function TechStackNetwork() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
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

      {/* Interactive globe */}
      <div className="relative mx-auto rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden px-4 py-6 sm:px-8 sm:py-8 lg:min-h-[480px]">
        {callouts.map((c) => (
          <BracketCallout key={`${c.side}-${c.position}`} {...c} />
        ))}

        <div className="relative z-10 max-w-xl lg:max-w-2xl mx-auto xl:mx-0 xl:ml-auto xl:mr-[12%]">
          <InteractiveTechGlobe
            activeLayer={activeLayer}
            onLayerChange={setActiveLayer}
            selectedNode={selectedNode}
            onNodeSelect={setSelectedNode}
          />
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
          Tap a layer to filter markers on the globe
        </motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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
              onClick={() => {
                setActiveLayer((prev) => (prev === layer.id ? null : layer.id));
                setSelectedNode(null);
              }}
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

      <AnimatePresence>
        {activeMeta && !selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 text-center"
          >
            <p className="text-sm text-orange-600 dark:text-orange-400 font-semibold" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              Showing {activeMeta.label} — {activeMeta.tools.join(', ')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
