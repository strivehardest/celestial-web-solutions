import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import * as gtag from "../lib/gtag";

export default function Hero({ headline, subheadline, ctaText }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Particles background */}
      <Particles
        className="absolute inset-0 -z-10"
        options={{
          fpsLimit: 60,
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { speed: 1 },
            links: { enable: true, distance: 150 },
            color: { value: "#ffffff" },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
            },
          },
          background: { color: "#1a202c" },
        }}
      />

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-4"
      >
        <h1 className="text-5xl font-bold text-white">{headline}</h1>
        <p className="mt-4 text-xl text-white/90">{subheadline}</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition">
          {ctaText}
        </button>
      </motion.div>
    </section>
  );
}
