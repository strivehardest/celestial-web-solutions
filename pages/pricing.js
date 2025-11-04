import Head from "next/head";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Globe, ShoppingCart, Rocket, Crown, Smartphone, Calculator, Plus, Minus, Info, X } from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';

export default function PricingWithCalculator() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
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
      cta: "Good for School Projects",
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
      cta: "For Real Eastate & Businesses",
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
      cta: "For Online Shops",
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
      cta: "For Large Businesses",
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

  return (
    <div className="min-h-screen bg-white">
      {/* === Dynamic SEO Meta Tags === */}
      <Head>
        <title>{`${currentPlanMeta.name} Package | ${billingPeriod === "monthly" ? "Monthly" : "Yearly"} Pricing | Celestial Web Solutions`}</title>
        <meta name="description" content={`${currentPlanMeta.description}. ${billingPeriod === "monthly" ? "Monthly price:" : "Yearly price:"} ${formatPrice(calculateTotal())}.`} />
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
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full opacity-50"></div>
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
          <motion.section initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <Calculator className="text-orange-600" size={32} />
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Custom Quote Calculator</h2>
                      <p className="text-gray-600" style={{ fontFamily: "Quicksand, sans-serif" }}>Build your perfect package</p>
                    </div>
                  </div>
                  <button onClick={resetCalculator} className="text-gray-500 hover:text-orange-600 transition-colors text-sm font-medium" style={{ fontFamily: "Quicksand, sans-serif" }}>Reset</button>
                </div>

                {/* Base Package Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>1. Choose Your Base Package</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["starter", "professional", "ecommerce", "enterprise"].map((pkg) => (
                      <button key={pkg} onClick={() => setSelectedBase(pkg)} className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedBase === pkg ? "border-orange-500 bg-orange-50 shadow-lg" : "border-gray-200 hover:border-orange-300"}`}>
                        <div className="font-bold text-gray-900 capitalize mb-1" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{pkg}</div>
                        <div className="text-orange-600 font-semibold" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(basePrices[pkg])}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>2. Add Extra Features</h3>
                  <div className="space-y-4">
                    {/* Extra Pages */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Extra Pages</div>
                        <div className="text-sm text-gray-600" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(addOnPrices.extraPages)} per page</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button onClick={() => updateQuantity("extraPages", -1)} className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={addOns.extraPages === 0}>
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{addOns.extraPages}</span>
                        <button onClick={() => updateQuantity("extraPages", 1)} className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors">
                          <Plus size={16} />
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
                      <div key={addon.key} className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl transition-colors ${addon.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100"}`} onClick={() => !addon.disabled && toggleAddOn(addon.key)}>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{addon.label}</span>
                            {addon.disabled && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded" style={{ fontFamily: "Quicksand, sans-serif" }}>Included</span>}
                          </div>
                          <div className="text-sm text-gray-600" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(addon.price)} {addon.note && <span className="ml-1">({addon.note})</span>}</div>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-colors ${addon.disabled ? "bg-gray-300" : addOns[addon.key] ? "bg-orange-500" : "bg-gray-300"}`}>
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${(addOns[addon.key] && !addon.disabled) ? "translate-x-6" : "translate-x-0.5"} mt-0.5`}></div>
                        </div>
                      </div>
                    ))}

                    {/* Custom Features */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Custom Features</div>
                        <div className="text-sm text-gray-600" style={{ fontFamily: "Quicksand, sans-serif" }}>{formatPrice(addOnPrices.customFeatures)} per feature</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button onClick={() => updateQuantity("customFeatures", -1)} className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={addOns.customFeatures === 0}>
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-bold text-gray-900" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{addOns.customFeatures}</span>
                        <button onClick={() => updateQuantity("customFeatures", 1)} className="w-8 h-8 rounded-lg bg-white border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-8 p-6 bg-orange-50 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-gray-700 font-semibold" style={{ fontFamily: "Quicksand, sans-serif" }}>Total Price ({billingPeriod === "yearly" ? "Yearly" : "Yearly"}):</div>
                    <div className="text-3xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{formatPrice(calculateTotal())}</div>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" style={{ fontFamily: "Quicksand, sans-serif" }}>
                    Requested Quote
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Our Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className={`border rounded-2xl p-6 shadow-lg relative ${plan.popular ? "border-orange-500" : "border-gray-200"}`}>
                {plan.popular && <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
                <plan.icon className="text-orange-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{plan.name}</h3>
                <p className="text-gray-600 mb-4" style={{ fontFamily: "Quicksand, sans-serif" }}>{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{formatPrice(plan.price[billingPeriod])}</span>
                  <span className="text-sm line-through text-gray-400 ml-2">{formatPrice(plan.originalPrice ? plan.originalPrice[billingPeriod] : plan.price[billingPeriod])}</span>
                </div>
                <ul className="mb-6 space-y-2 text-gray-700 text-sm" style={{ fontFamily: "Quicksand, sans-serif" }}>
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center space-x-2"><Check className="text-green-500" size={16} /> <span>{feat}</span></li>
                  ))}
                </ul>
                <button className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" style={{ fontFamily: "Quicksand, sans-serif" }}>{plan.cta}</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Ready to Start Your Project?</h2>
        <p className="text-lg mb-8" style={{ fontFamily: "Quicksand, sans-serif" }}>Get in touch today and let's build your online presence together!</p>
        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/contact" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" style={{ fontFamily: "Quicksand, sans-serif" }}>Contact Us</motion.a>
      </section>

      <WhatsAppButton />
    </div>
  );
}
