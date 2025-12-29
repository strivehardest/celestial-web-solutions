import { motion } from 'framer-motion';
import * as gtag from "../lib/gtag";

const Services = ({ services }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section - remains unchanged */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl font-extrabold leading-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            We offer a wide range of digital solutions to help you grow your business online.
          </motion.p>
        </div>

        {/* Services Grid - modified for 2 columns */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => {
            const IconComponent = service.icon;
            return (
              <motion.article
                key={service.title}
                className="group relative bg-white dark:bg-gray-800 p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                whileHover={{ 
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Service card content - adjusted spacing */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 flex-shrink-0"
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white" aria-hidden="true" />
                    </motion.div>
                    <motion.h2 
                      className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300"
                      style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                    >
                      {service.title}
                    </motion.h2>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300" 
                     style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {service.description}
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.keywords.map((keyword, idx) => (
                      <span 
                        key={idx} 
                        className="text-sm px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced decorative elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-600/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-gradient-to-br from-orange-400/10 to-orange-500/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA Section - remains unchanged */}
        <div className="mt-16 text-center">
          <motion.button
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Get Started clicked')}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </section>
  );
}

export default Services;