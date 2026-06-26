import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { RotateCcw, X } from 'lucide-react';

const DEG = Math.PI / 180;

const layerLabels = {
  frontend: 'Frontend',
  backend: 'Backend & Data',
  content: 'Content & CMS',
  commerce: 'Commerce & Pay',
  design: 'Design & Tools',
};

export const globeTechNodes = [
  { name: 'Next.js', icon: '/images/tech/nextjs.svg', layer: 'frontend', lat: 38, lng: 12, blurb: 'Production React framework', description: 'We use Next.js for SSR, static generation, and SEO-ready sites that load fast and rank well on Google.' },
  { name: 'React', icon: '/images/tech/react.svg', layer: 'frontend', lat: 18, lng: -48, blurb: 'Component-based UI library', description: 'React powers interactive interfaces — reusable components, smooth state management, and a massive ecosystem of tools.' },
  { name: 'TypeScript', icon: '/images/tech/typescript.svg', layer: 'frontend', lat: 24, lng: 72, blurb: 'Typed JavaScript at scale', description: 'TypeScript catches bugs before launch and makes large codebases easier to maintain as your product grows.' },
  { name: 'Tailwind', icon: '/images/tailwindcss-logo.png', layer: 'frontend', lat: -8, lng: -28, blurb: 'Utility-first CSS framework', description: 'Tailwind lets us ship polished, responsive designs quickly without writing custom CSS from scratch.' },
  { name: 'JavaScript', icon: '/images/tech/javascript.svg', layer: 'frontend', lat: 8, lng: -98, blurb: 'The language of the web', description: 'JavaScript runs everywhere — browsers, servers, and apps — making it the backbone of modern web development.' },
  { name: 'HTML5', icon: '/images/tech/html5.svg', layer: 'frontend', lat: 44, lng: 48, blurb: 'Semantic web structure', description: 'Clean, accessible HTML5 markup gives every site a solid foundation for SEO and screen-reader compatibility.' },
  { name: 'CSS3', icon: '/images/tech/css3.svg', layer: 'frontend', lat: -14, lng: 98, blurb: 'Modern styling & animations', description: 'CSS3 delivers responsive layouts, smooth animations, and pixel-perfect visuals across all devices.' },
  { name: 'Node.js', icon: '/images/tech/nodejs.svg', layer: 'backend', lat: -22, lng: 8, blurb: 'JavaScript on the server', description: 'Node.js handles APIs, server logic, and real-time features — keeping your full stack in one language.' },
  { name: 'Supabase', icon: '/images/tech/supabase.svg', layer: 'backend', lat: 6, lng: 38, blurb: 'Open-source Firebase alternative', description: 'Supabase gives us Postgres databases, authentication, storage, and realtime subscriptions out of the box.' },
  { name: 'MongoDB', icon: '/images/tech/mongodb.svg', layer: 'backend', lat: -30, lng: 58, blurb: 'Flexible NoSQL database', description: 'MongoDB stores unstructured and fast-changing data — ideal for apps with dynamic content and high traffic.' },
  { name: 'Python', icon: '/images/tech/python.svg', layer: 'backend', lat: -36, lng: -58, blurb: 'Versatile backend language', description: 'Python powers data processing, automation scripts, and Django backends for complex business applications.' },
  { name: 'Django', icon: '/images/tech/django.svg', layer: 'backend', lat: 14, lng: -128, blurb: 'High-level Python web framework', description: 'Django delivers secure, scalable admin panels and APIs — perfect for data-heavy platforms and portals.' },
  { name: 'Sanity CMS', icon: '/images/tech/sanity.svg', layer: 'content', lat: 42, lng: -118, blurb: 'Headless content platform', description: 'Sanity CMS lets clients edit content in a beautiful studio while we control the frontend — used on COPTI & Kafui Dey.' },
  { name: 'WordPress', icon: '/images/tech/wordpress.svg', layer: 'content', lat: 50, lng: -78, blurb: 'World\'s most popular CMS', description: 'WordPress is our go-to for blogs, marketing sites, and WooCommerce stores that clients can manage themselves.' },
  { name: 'Paystack', icon: '/images/paystack-logo.png', layer: 'commerce', lat: -32, lng: -4, blurb: 'Payments built for Africa', description: 'Paystack handles card, mobile money, and bank transfers — the standard for Ghanaian e-commerce checkout.' },
  { name: 'Flutterwave', icon: '/images/flutterwave-logo.png', layer: 'commerce', lat: -16, lng: -18, blurb: 'Pan-African payment gateway', description: 'Flutterwave enables cross-border payments across Africa and internationally for growing online businesses.' },
  { name: 'Shopify', icon: '/images/shopify-logo.png', layer: 'commerce', lat: 28, lng: 132, blurb: 'Hosted e-commerce platform', description: 'Shopify powers fully managed online stores with themes, inventory, and payment processing built in.' },
  { name: 'WooCommerce', icon: '/images/tech/woocommerce.svg', layer: 'commerce', lat: -44, lng: 22, blurb: 'WordPress e-commerce plugin', description: 'WooCommerce turns WordPress into a full online store — flexible, customisable, and cost-effective.' },
  { name: 'Figma', icon: '/images/tech/figma.svg', layer: 'design', lat: 34, lng: -158, blurb: 'Collaborative UI design tool', description: 'Figma is where we wireframe, prototype, and hand off pixel-perfect designs before a single line of code is written.' },
];

function latLngToXYZ(lat, lng) {
  const phi = lat * DEG;
  const lambda = lng * DEG;
  return {
    x: Math.cos(phi) * Math.sin(lambda),
    y: Math.sin(phi),
    z: Math.cos(phi) * Math.cos(lambda),
  };
}

function rotateY({ x, y, z }, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c + z * s, y, z: -x * s + z * c };
}

function rotateX({ x, y, z }, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x, y: y * c - z * s, z: y * s + z * c };
}

function projectNode(node, rotX, rotY, radius, cx, cy) {
  let p = latLngToXYZ(node.lat, node.lng);
  p = rotateY(p, rotY);
  p = rotateX(p, rotX);
  if (p.z < 0.08) return null;
  const depth = (p.z + 1) / 2;
  return {
    x: cx + p.x * radius,
    y: cy - p.y * radius,
    scale: 0.55 + depth * 0.55,
    opacity: 0.35 + depth * 0.65,
    z: p.z,
  };
}

function GlobeWireframe({ rotX, rotY, radius, cx, cy, activeLayer }) {
  const latLines = [-60, -30, 0, 30, 60];
  const lonStep = 24;

  const gridPaths = useMemo(() => {
    const paths = [];
    latLines.forEach((lat) => {
      const pts = [];
      for (let lng = 0; lng <= 360; lng += 6) {
        let p = latLngToXYZ(lat, lng - 180);
        p = rotateY(p, rotY);
        p = rotateX(p, rotX);
        if (p.z < 0) {
          if (pts.length) {
            paths.push({ d: pts.join(' '), visible: true });
            pts.length = 0;
          }
          continue;
        }
        pts.push(`${pts.length ? 'L' : 'M'} ${cx + p.x * radius} ${cy - p.y * radius}`);
      }
      if (pts.length) paths.push({ d: pts.join(' '), visible: true });
    });

    for (let lng = 0; lng < 360; lng += lonStep) {
      const pts = [];
      for (let lat = -80; lat <= 80; lat += 6) {
        let p = latLngToXYZ(lat, lng - 180);
        p = rotateY(p, rotY);
        p = rotateX(p, rotX);
        if (p.z < 0) {
          if (pts.length) {
            paths.push({ d: pts.join(' '), visible: true });
            pts.length = 0;
          }
          continue;
        }
        pts.push(`${pts.length ? 'L' : 'M'} ${cx + p.x * radius} ${cy - p.y * radius}`);
      }
      if (pts.length) paths.push({ d: pts.join(' '), visible: true });
    }
    return paths;
  }, [rotX, rotY, radius, cx, cy]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <circle cx={cx} cy={cy} r={radius} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300 dark:text-gray-600" opacity="0.9" />
      {gridPaths.map((path, i) => (
        <path
          key={i}
          d={path.d}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gray-300 dark:text-gray-600"
          opacity={activeLayer ? 0.35 : 0.55}
        />
      ))}
      {[0.25, 0.45, 0.65].map((latFrac, li) => {
        const dots = [];
        for (let lng = -150; lng <= 180; lng += 18) {
          let p = latLngToXYZ(latFrac * 60 - 30, lng);
          p = rotateY(p, rotY);
          p = rotateX(p, rotX);
          if (p.z > 0.2) dots.push({ x: cx + p.x * radius, y: cy - p.y * radius, o: p.z });
        }
        return dots.map((d, j) => (
          <circle key={`${li}-${j}`} cx={d.x} cy={d.y} r={2} fill="#f97316" opacity={d.o * 0.45} />
        ));
      })}
    </svg>
  );
}

export default function InteractiveTechGlobe({ activeLayer, onLayerChange, onNodeSelect, selectedNode }) {
  const containerRef = useRef(null);
  const [rotX, setRotX] = useState(-0.15);
  const [rotY, setRotY] = useState(0.4);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, startRotX: 0, startRotY: 0 });
  const [size, setSize] = useState({ w: 400, h: 400 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (isDragging) return;
    let frame;
    const tick = () => {
      setRotY((r) => r + 0.0018);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isDragging]);

  const radius = Math.min(size.w, size.h) * 0.36;
  const cx = size.w / 2;
  const cy = size.h / 2;

  const projected = useMemo(
    () =>
      globeTechNodes
        .map((node) => {
          const pos = projectNode(node, rotX, rotY, radius, cx, cy);
          return pos ? { node, ...pos } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.z - b.z),
    [rotX, rotY, radius, cx, cy]
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (e.target.closest('[data-tech-marker]')) return;
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startRotX: rotX,
        startRotY: rotY,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [rotX, rotY]
  );

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setRotY(dragRef.current.startRotY + dx * 0.008);
    setRotX(Math.max(-0.9, Math.min(0.9, dragRef.current.startRotX + dy * 0.008)));
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMarkerClick = (node, e) => {
    e.stopPropagation();
    const isDeselect = selectedNode?.name === node.name;
    onNodeSelect(isDeselect ? null : node);
    onLayerChange(isDeselect ? null : node.layer);
  };

  const resetGlobe = () => {
    setRotX(-0.15);
    setRotY(0.4);
    onNodeSelect(null);
    onLayerChange(null);
  };

  return (
    <div className="relative w-full">
      <p
        className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center justify-center gap-1.5"
        style={{ fontFamily: 'Albert Sans, sans-serif' }}
      >
        <RotateCcw className="w-3.5 h-3.5 text-orange-500" />
        Drag to spin · Click a marker to explore
      </p>

      <div
        ref={containerRef}
        className={`relative w-full touch-none select-none rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ height: Math.min(size.w, 420), maxHeight: 420, minHeight: 240 }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        role="application"
        aria-label="Interactive tech stack globe. Drag to rotate, click markers for details."
      >
        <GlobeWireframe rotX={rotX} rotY={rotY} radius={radius} cx={cx} cy={cy} activeLayer={activeLayer} />

        {projected.map(({ node, x, y, scale, opacity, z }) => {
          const isSelected = selectedNode?.name === node.name;
          const layerMatch = !activeLayer || node.layer === activeLayer;
          const markerSize = 30 * scale;

          return (
            <button
              key={node.name}
              type="button"
              data-tech-marker
              onClick={(e) => handleMarkerClick(node, e)}
              className="absolute z-10 flex flex-col items-center gap-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-xl"
              style={{
                left: x,
                top: y,
                opacity: layerMatch ? opacity : opacity * 0.25,
                transform: `translate(-50%, -50%) scale(${scale * (isSelected ? 1.15 : 1)})`,
                zIndex: Math.round(z * 100),
              }}
              aria-label={`${node.name} — ${node.layer}`}
              aria-pressed={isSelected}
            >
              <span
                className={`rounded-xl bg-white dark:bg-gray-800 border-2 flex items-center justify-center shadow-lg transition-colors ${
                  isSelected
                    ? 'border-orange-500 shadow-orange-500/30'
                    : 'border-gray-200 dark:border-gray-600 hover:border-orange-400'
                }`}
                style={{ width: markerSize, height: markerSize, padding: 4 }}
              >
                <Image src={node.icon} alt="" width={markerSize - 12} height={markerSize - 12} className="object-contain pointer-events-none" />
              </span>
              <span
                className={`text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded-full border max-w-[4.5rem] truncate ${
                  isSelected
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white/95 dark:bg-gray-900/95 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600'
                }`}
                style={{ fontFamily: 'Albert Sans, sans-serif' }}
              >
                {node.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mt-3">
        <button
          type="button"
          onClick={resetGlobe}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 transition-colors"
          style={{ fontFamily: 'Albert Sans, sans-serif' }}
        >
          <RotateCcw className="w-3 h-3" />
          Reset view
        </button>
      </div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 mx-auto max-w-md rounded-2xl border border-orange-200 dark:border-orange-800 bg-orange-50/80 dark:bg-orange-950/40 p-4 relative"
          >
            <button
              type="button"
              onClick={() => {
                onNodeSelect(null);
                onLayerChange(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 pr-6">
              <div className="w-11 h-11 rounded-xl bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-700 flex items-center justify-center shrink-0">
                <Image src={selectedNode.icon} alt="" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
                  {selectedNode.name}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
                  {layerLabels[selectedNode.layer] || selectedNode.layer}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-3" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              {selectedNode.blurb}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>
              {selectedNode.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
