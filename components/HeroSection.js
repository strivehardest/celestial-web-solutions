import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ArrowRight, Zap } from 'lucide-react';

const HeroSection = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-0">
      {/* Custom Background with Local Image - More Visible */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(255,107,0,0.65) 0%, rgba(255,69,0,0.6) 50%, rgba(220,38,127,0.65) 100%), url("/hero-bg.jpg")',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Floating Code Elements - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        {/* Animated Code Snippets */}
        <div className="absolute top-20 left-10 text-orange-300/30 text-sm font-mono animate-pulse">
          const company = "Celestial Web Solutions";
        </div>
        <div className="absolute top-40 right-20 text-orange-400/40 text-xs font-mono animate-pulse" style={{animationDelay: '1s'}}>
          NextJS.createApp()
        </div>
        <div className="absolute bottom-32 left-32 text-orange-200/30 text-sm font-mono animate-pulse" style={{animationDelay: '2s'}}>
          function buildWebsite() {"{"}
        </div>
        <div className="absolute bottom-52 right-16 text-orange-300/35 text-xs font-mono animate-pulse" style={{animationDelay: '3s'}}>
          Django.models.create()
        </div>
        <div className="absolute top-60 left-1/4 text-orange-400/30 text-xs font-mono animate-pulse" style={{animationDelay: '4s'}}>
          React.render(solution)
        </div>
        <div className="absolute bottom-40 right-1/3 text-orange-200/35 text-sm font-mono animate-pulse" style={{animationDelay: '5s'}}>
          return success;
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/30 to-orange-600/30 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-300/30 to-red-400/30 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full opacity-30 animate-spin" style={{animationDuration: '20s'}}></div>
        
        {/* Binary Code Rain Effect */}
        <div className="absolute top-0 left-1/4 w-0.5 h-full bg-gradient-to-b from-orange-400/20 via-orange-500/10 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-0.5 h-full bg-gradient-to-b from-orange-300/20 via-orange-400/10 to-transparent animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gradient-to-b from-orange-500/15 via-orange-400/8 to-transparent animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>
      
      {/* Mobile-only simplified background elements */}
      <div className="absolute inset-0 overflow-hidden md:hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-orange-600/20 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-orange-300/20 to-red-400/20 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Developer Badge - Responsive text and padding */}
          <motion.div
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-orange-300/30 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-full mb-6 sm:mb-8 text-xs sm:text-sm font-semibold"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="hidden sm:inline">Full Stack Development</span>
            <span className="sm:hidden">Full Stack Dev</span>
            <span className="animate-pulse">●</span>
            <span className="hidden sm:inline">Available for Projects</span>
            <span className="sm:hidden">Available</span>
          </motion.div>
          
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 text-white drop-shadow-2xl leading-tight"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block">Welcome to</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-400 to-red-400">
              Celestial Web Solutions
            </span>
          </motion.h1>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed drop-shadow-lg px-2"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Crafting exceptional web experiences with
            <span className="text-orange-300 font-semibold block sm:inline"> modern technologies</span>
          </motion.p>
          
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto px-2"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From concept to deployment, we build scalable web applications that drive business growth. 
            Let's turn your vision into digital reality.
          </motion.p>
          
          {/* Enhanced Call to Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Primary CTA Button */}
            <motion.button
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 lg:px-14 lg:py-6 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-2xl overflow-hidden text-base sm:text-lg lg:text-xl transition-all duration-300"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/contact')}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex items-center justify-center space-x-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Let's Build Together</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>

            {/* Secondary CTA Button */}
            <motion.button
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 lg:px-14 lg:py-6 border-3 border-white/60 text-white font-bold rounded-2xl shadow-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-base sm:text-lg lg:text-xl"
              style={{ fontFamily: 'Quicksand, sans-serif' }}
              whileHover={{ scale: 1.08, y: -4, borderColor: '#ffffff' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('/portfolio')}
            >
              <div className="flex items-center justify-center space-x-3">
                <span>View Our Work</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;