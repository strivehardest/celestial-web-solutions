import { motion } from 'framer-motion';
import PremiumCTA from './PremiumCTA';

export default function CTASection({ 
  title = "Ready to Transform Your Business?",
  subtitle = "Let's discuss your project and create something amazing together.",
  primaryText = "Start Your Project",
  secondaryText = "View Our Work",
  primaryHref = "/contact",
  secondaryHref = "/portfolio",
  showSecondary = true,
  variant = 'gradient', // 'gradient' | 'dark' | 'light'
}) {
  const variants = {
    gradient: {
      bg: 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500',
      title: 'text-white',
      subtitle: 'text-orange-100',
    },
    dark: {
      bg: 'bg-gray-900',
      title: 'text-white',
      subtitle: 'text-gray-300',
    },
    light: {
      bg: 'bg-gradient-to-br from-orange-50 via-white to-orange-50',
      title: 'bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent',
      subtitle: 'text-gray-600',
    },
  };

  const style = variants[variant];

  return (
    <section className={`relative py-24 overflow-hidden ${style.bg}`}>
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        {variant === 'gradient' && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/20 rounded-full blur-3xl" />
          </>
        )}
        {variant === 'dark' && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`h-1 ${variant === 'light' ? 'bg-orange-500' : 'bg-white'} mx-auto mb-8 rounded-full`}
          />

          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${style.title}`}
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            {title}
          </h2>
          
          <p
            className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${style.subtitle}`}
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <PremiumCTA 
              href={primaryHref}
              variant={variant === 'light' ? 'primary' : 'secondary'}
              size="large"
            >
              {primaryText}
            </PremiumCTA>

            {showSecondary && (
              <PremiumCTA 
                href={secondaryHref}
                variant={variant === 'light' ? 'outline' : 'primary'}
                size="large"
              >
                {secondaryText}
              </PremiumCTA>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
