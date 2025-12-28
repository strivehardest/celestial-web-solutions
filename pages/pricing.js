import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Globe, ShoppingCart, Rocket, Crown, Smartphone, Calculator, Plus, Minus, Info, X } from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';

export default function PricingWithCalculator() {
  const [billingPeriod, setBillingPeriod] = useState("yearly");
  const [showCalculator, setShowCalculator] = useState(false);

  // Calculator state
  const [selectedBase, setSelectedBase] = useState("starter");
  const [addOns, setAddOns] = useState({
    extraPages: 0,
    ecommerce: false,
    blog: false,
    seo: false,
    maintenance: false,
    mobileApp: false,
    customFeatures: 0
  });

  const basePrices = {
    starter: 2500,
    professional: 3500,
    ecommerce: 4500,
    enterprise: 8000
  };

  const addOnPrices = {
    extraPages: 200,
    ecommerce: 1000,
    blog: 200,
    seo: 800,
    maintenance: 150,
    mobileApp: 12000,
    customFeatures: 1000
  };

  const calculateTotal = () => {
    let total = basePrices[selectedBase];

    total += addOns.extraPages * addOnPrices.extraPages;
    if (addOns.ecommerce && selectedBase !== "ecommerce") total += addOnPrices.ecommerce;
    if (addOns.blog) total += addOnPrices.blog;
    if (addOns.seo) total += addOnPrices.seo;
    if (addOns.maintenance) total += addOnPrices.maintenance * 12;
    if (addOns.mobileApp) total += addOnPrices.mobileApp;
    total += addOns.customFeatures * addOnPrices.customFeatures;

    return total;
  };

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups",
      icon: Globe,
      popular: false,
      price: { monthly: 2500, yearly: 3000 },
      originalPrice: { monthly: 3500, yearly: 4500 },
      features: [
        "5-Page Responsive Website",
        "Mobile-Friendly Design",
        "Basic SEO Optimization",
        "Contact Form Integration",
        "Social Media Links",
        "Free Domain (.com/.net/.org)",
        "1 Year Free Hosting",
        "Basic SSL Certificate",
        "Email Support",
        "2 Rounds of Revisions"
      ],
      cta: "Choose Starter",
      tag: "Good for School Projects",
      deliveryTime: "7-10 days"
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses",
      icon: Rocket,
      popular: true,
      price: { monthly: 3500, yearly: 4500 },
      originalPrice: { monthly: 4500, yearly: 5500 },
      features: [
        "10-Page Responsive Website",
        "Custom Design & Branding",
        "Advanced SEO Optimization",
        "Google Analytics Setup",
        "Blog/News Section",
        "Newsletter Integration",
        "Social Media Integration",
        "Free Domain & 12 Months Hosting",
        "Premium SSL Certificate",
        "Priority Email Support",
        "5 Rounds of Revisions",
        "Basic Training Session"
      ],
      cta: "Choose Professional",
      tag: "For Real Estate & Businesses",
      deliveryTime: "10-14 days"
    },
    {
      name: "E-Commerce",
      description: "Complete online store solution",
      icon: ShoppingCart,
      popular: false,
      price: { monthly: 4500, yearly: 6000 },
      originalPrice: { monthly: 6000, yearly: 8000 },
      features: [
        "Unlimited Products",
        "Shopping Cart & Checkout",
        "Payment Gateway Integration",
        "Inventory Management",
        "Order Management System",
        "Customer Account Portal",
        "Mobile Money Integration",
        "Paystack/Flutterwave Setup",
        "Product Search & Filters",
        "Email Notifications",
        "Free Domain & 1 Year Hosting",
        "Advanced SSL Certificate",
        "Phone & Email Support",
        "Complete Training Session"
      ],
      cta: "Choose E-Commerce",
      tag: "For Online Shops",
      deliveryTime: "15-30 days"
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large businesses",
      icon: Crown,
      popular: false,
      price: { monthly: 8000, yearly: 10000 },
      features: [
        "Custom Web Application",
        "Advanced Functionality",
        "Database Integration",
        "User Management System",
        "API Development",
        "Third-party Integrations",
        "Advanced Security Features",
        "Performance Optimization",
        "Scalable Architecture",
        "1 Year Free Hosting & Domain",
        "24/7 Priority Support",
        "Dedicated Project Manager",
        "Unlimited Revisions",
        "Comprehensive Training",
        "6 Months Free Maintenance"
      ],
      cta: "Choose Enterprise",
      tag: "For Large Businesses",
      deliveryTime: "30-60 days"
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price).replace('GHS', '₵');
  };

  const toggleAddOn = (addOnName) => setAddOns(prev => ({ ...prev, [addOnName]: !prev[addOnName] }));
  const updateQuantity = (field, delta) => setAddOns(prev => ({ ...prev, [field]: Math.max(0, prev[field] + delta) }));
  const resetCalculator = () => {
    setSelectedBase("starter");
    setAddOns({ extraPages: 0, ecommerce: false, blog: false, seo: false, maintenance: false, mobileApp: false, customFeatures: 0 });
  };

  const currentPlanMeta = pricingPlans.find(plan => plan.name.toLowerCase() === selectedBase) || pricingPlans[0];

  const getWhatsAppLink = (planName, price) => {
    const message = `Hi Celestial Web Solutions! I'm interested in your ${planName} package priced at ${formatPrice(price)}. Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/233530505031?text=${encodedMessage}`;
  };

  const getCalculatorWhatsAppLink = () => {
    const total = calculateTotal();
    const message = `Hi! I calculated a custom quote using your calculator: ${formatPrice(total)}. Can we discuss this package?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/233530505031?text=${encodedMessage}`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* === Dynamic SEO Meta Tags === */}
      <Head>
        <title>{`${currentPlanMeta.name} Package | ${billingPeriod === "monthly" ? "Monthly" : "Yearly"} Pricing | Celestial Web Solutions`}</title>
        <meta name="description" content={`${currentPlanMeta.description}. Starting price: ${formatPrice(calculateTotal())}.`} />
        <meta name="keywords" content={`Web development pricing Ghana, ${currentPlanMeta.name} package, ${billingPeriod} plan, Web design Ghana, E-commerce development, Web Design prices in Ghana, web design price Ghana, affordable web design price in Ghana, web design prices in Accra, cheapest web design prices in Accra Ghana, web designer Accra, web Designer Ghana, Custom website solutions`} />
        <meta property="og:title" content={`${currentPlanMeta.name} Package | ${billingPeriod === "monthly" ? "Monthly" : "Yearly"} Pricing`} />
        <meta property="og:description" content={currentPlanMeta.description} />
        <meta property="og:image" content="https://www.celestialwebsolutions.net/images/pricing-banner.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.celestialwebsolutions.net/pricing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${currentPlanMeta.name} Package | ${billingPeriod === "monthly" ? "Monthly" : "Yearly"} Pricing`} />
        <meta name="twitter:description" content={currentPlanMeta.description} />
        <meta name="twitter:image" content="https://www.celestialwebsolutions.net/images/pricing-banner.jpg" />
        <link rel="canonical" href="https://www.celestialwebsolutions.net/pricing" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&h=600&fit=crop" 
            alt="Pricing Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300/50 via-orange-600/40 to-red-500/80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Our Pricing</h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "Quicksand, sans-serif" }}>
              Quality web development services at affordable rates. No hidden fees, flexible payment plans, and prices in Ghana Cedis.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-2 inline-flex flex-wrap">
              <button onClick={() => setBillingPeriod("monthly")} className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${billingPeriod === "monthly" ? "bg-white text-orange-600 shadow-lg" : "text-white hover:bg-white/10"}`} style={{ fontFamily: "Quicksand, sans-serif" }}>
                Development Packages
              </button>
              <button onClick={() => setBillingPeriod("yearly")} className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 relative ${billingPeriod === "yearly" ? "bg-white text-orange-600 shadow-lg" : "text-white hover:bg-white/10"}`} style={{ fontFamily: "Quicksand, sans-serif" }}>
                With Maintenance
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-800 text-xs px-2 py-1 rounded-full font-bold" style={{ fontFamily: "Quicksand, sans-serif" }}>Save</span>
              </button>
            </div>

            {/* Calculator Toggle Button */}
            <motion.button onClick={() => setShowCalculator(!showCalculator)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6 inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" style={{ fontFamily: "Quicksand, sans-serif" }}>
              <Calculator size={20} />
              <span>{showCalculator ? "Hide Calculator" : "Calculate Your Price"}</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <AnimatePresence>
        {showCalculator && (
          <motion.section initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="py-16 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <Calculator className="text-orange-600" size={32} />
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Custom Quote Calculator</h2>
                      <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: "Quicksand, sans-serif" }}>Build your perfect package</p>
                    </div>
                  </div>
                  <button onClick={resetCalculator} className="text-gray-500 hover:text-orange-600 transition-colors text-sm font-medium" style={{ fontFamily: "Quicksand, sans-serif" }}>Reset</button>
                </div>

                {/* Base Package Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>1. Choose Your Base Package</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["starter", "professional", "ecommerce", "enterprise"].map((pkg) => (
                      <button key={pkg} onClick={() => setSelectedBase(pkg)} className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedBase === pkg ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg" : "border-gray-200 dark:border-gray-700 hover:border-orange-300 bg-white dark:bg-gray-800"}`}>
                        <div className="font-bold text-gray-900 dark:text-white capitalize mb-1" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{pkg}</div>
                        <div className="text-orange-600 font-semibold" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(basePrices[pkg])}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>2. Add Extra Features</h3>
                  <div className="space-y-4">
                    {/* Extra Pages */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Extra Pages</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(addOnPrices.extraPages)} per page</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button onClick={() => updateQuantity("extraPages", -1)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={addOns.extraPages === 0}>
                          <Minus size={16} className="text-gray-700 dark:text-gray-300" />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{addOns.extraPages}</span>
                        <button onClick={() => updateQuantity("extraPages", 1)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center hover:border-orange-500 transition-colors">
                          <Plus size={16} className="text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>

                    {/* Toggle Add-ons */}
                    {[
                      { key: "ecommerce", label: "E-commerce Features", price: addOnPrices.ecommerce, disabled: selectedBase === "ecommerce" },
                      { key: "blog", label: "Blog/News Section", price: addOnPrices.blog },
                      { key: "seo", label: "Advanced SEO Package", price: addOnPrices.seo },
                      { key: "maintenance", label: "Annual Maintenance", price: addOnPrices.maintenance * 12, note: "₵150/month" },
                      { key: "mobileApp", label: "Mobile App Development", price: addOnPrices.mobileApp }
                    ].map((addon) => (
                      <div key={addon.key} className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors ${addon.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"}`} onClick={() => !addon.disabled && toggleAddOn(addon.key)}>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{addon.label}</span>
                            {addon.disabled && <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded" style={{ fontFamily: "Quicksand, sans-serif" }}>Included</span>}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(addon.price)} {addon.note && <span className="ml-1">({addon.note})</span>}</div>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-colors ${addon.disabled ? "bg-gray-300" : addOns[addon.key] ? "bg-orange-500" : "bg-gray-300"}`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${(addOns[addon.key] && !addon.disabled) ? "translate-x-6" : "translate-x-0.5"} mt-0.5`}></div>
                        </div>
                      </div>
                    ))}

                    {/* Custom Features */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Custom Features</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(addOnPrices.customFeatures)} per feature</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button onClick={() => updateQuantity("customFeatures", -1)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={addOns.customFeatures === 0}>
                          <Minus size={16} className="text-gray-700 dark:text-gray-300" />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{addOns.customFeatures}</span>
                        <button onClick={() => updateQuantity("customFeatures", 1)} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center hover:border-orange-500 transition-colors">
                          <Plus size={16} className="text-gray-700 dark:text-gray-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-gray-700 dark:text-gray-300 font-semibold" style={{ fontFamily: "Quicksand, sans-serif" }}>Total Price ({billingPeriod === "yearly" ? "Yearly" : "Yearly"}):</div>
                    <div className="text-3xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{formatPrice(calculateTotal())}</div>
                  </div>
                  <PremiumCTA href={getCalculatorWhatsAppLink()} size="default" variant="primary" className="flex items-center space-x-2" target="_blank" rel="noopener noreferrer">
                    <span>Order on WhatsApp</span>
                  </PremiumCTA>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Our Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className={`border rounded-2xl p-6 shadow-lg relative bg-white dark:bg-gray-800 ${plan.popular ? "border-orange-500" : "border-gray-200 dark:border-gray-700"}`}>
                {plan.popular && <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
                <plan.icon className="text-orange-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ fontFamily: "Quicksand, sans-serif" }}>{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{formatPrice(plan.price[billingPeriod])}</span>
                  <span className="text-sm line-through text-gray-400 ml-2">{formatPrice(plan.originalPrice ? plan.originalPrice[billingPeriod] : plan.price[billingPeriod])}</span>
                </div>
                <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm" style={{ fontFamily: "Quicksand, sans-serif" }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2"><Check className="text-green-500" size={16} /> <span>{feat}</span></li>
                  ))}
                </ul>
                <PremiumCTA href={getWhatsAppLink(plan.name, plan.price[billingPeriod])} size="default" variant="primary" className="w-full justify-center" target="_blank" rel="noopener noreferrer">
                  {plan.cta}
                </PremiumCTA>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Ready to Start Your Project?</h2>
        <p className="text-lg mb-8" style={{ fontFamily: "Quicksand, sans-serif" }}>Get in touch today and let's build your online presence together!</p>
        <PremiumCTA href="/contact" size="default" variant="primary">
          Contact Us
        </PremiumCTA>
      </section>

      <WhatsAppButton />
    </div>
  );
}