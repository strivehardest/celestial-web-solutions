import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  // CONFIGURATION
  const config = {
    delayBeforeShow: 3000, // 3 seconds delay before showing popup
    whatsappNumber: '233530505031',
    whatsappMessage: 'Hi! I saw your December discount offer. I would like to know more about your web development services.',
    posterImage: '/promo-poster1.png', // Saved poster image in public folder
    showOncePerSession: true // Set to false to show every time page loads
  };

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('promoPopupShown');
    
    if (config.showOncePerSession && popupShown) {
      return; // Don't show if already shown in this session
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      if (config.showOncePerSession) {
        sessionStorage.setItem('promoPopupShown', 'true');
      }
    }, config.delayBeforeShow);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handlePosterClick = () => {
    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(config.whatsappMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop/Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Close Button - Separate from popup content */}
          <motion.button
            onClick={handleClose}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[10000] w-12 h-12 md:w-16 md:h-16 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white transition-all duration-300 border-4 border-white dark:border-gray-900"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={28} strokeWidth={3} />
          </motion.button>

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ 
              duration: 0.5, 
              type: "spring", 
              stiffness: 200, 
              damping: 20 
            }}
            className="absolute inset-0 flex items-center justify-center p-4 md:p-12"
          >
            <div className="relative w-full h-full max-w-[95%] max-h-[95%] md:max-w-[85vw] md:max-h-[90vh] lg:max-w-[70vw] lg:max-h-[85vh] flex items-center justify-center">
              {/* Poster Image - Clickable */}
              <motion.div
                onClick={handlePosterClick}
                className="cursor-pointer relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl bg-white w-full h-full flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={config.posterImage}
                  alt="October Discount - Celestial Web Solutions"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error('Poster image failed to load');
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback if image doesn't load */}
                <div 
                  className="w-full aspect-square bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-center p-8"
                  style={{ display: 'none' }}
                >
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">OCTOBER DISCOUNT</h2>
                    <p className="text-lg md:text-2xl mb-4">Web Development Services</p>
                    <p className="text-2xl md:text-4xl font-bold">Starting from GH₵ 2,000</p>
                    <p className="mt-4 text-base md:text-xl">Click to chat on WhatsApp</p>
                  </div>
                </div>

                {/* Hover Overlay with Call-to-Action */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 md:pb-8"
                >
                  <div className="text-white text-center px-4">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-green-500 hover:bg-green-600 px-4 py-2 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg shadow-xl flex items-center space-x-2 justify-center"
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span>Click to Chat on WhatsApp</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;