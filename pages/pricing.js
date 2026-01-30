<Head>
  <meta name="keywords" content="best web design company in ghana, web design company in Ghana, web development company in Ghana, website designers in Ghana, web development company Ghana, SEO services in Ghana, e-commerce website Ghana, web designer in Accra, web designer in Keta, web design company in Accra, web designer in Accra Ghana, web design company in Keta, website design services Ghana, e-commerce website development Ghana, business website design Ghana, affordable web design Ghana" />
</Head>
import Head from "next/head";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Zap, Globe, ShoppingCart, Rocket, Crown, Smartphone, Calculator, Plus, Minus, Info, X, Gift, Clock, Award, Trophy, TrendingUp, Sparkles, ArrowRight } from "lucide-react";
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';

// Currency configuration with flags
const currencies = [
  { code: 'GHS', symbol: 'GH₵', name: 'Ghana Cedi', flag: 'gh' },
  { code: 'USD', symbol: '$', name: 'US Dollar', flag: 'us' },
  { code: 'GBP', symbol: '£', name: 'British Pound', flag: 'gb' },
  { code: 'EUR', symbol: '€', name: 'Euro', flag: 'eu' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', flag: 'ng' },
];

const typingPhrases = [
  'Affordable Web Design Packages',
  'E-Commerce Website Pricing',
  'Custom Web App Quotes',
  'Flexible Payment Plans',
  'Contact us: +233 24 567 1832',
  'Email: info@celestialwebsolutions.net',
];

export default function PricingWithCalculator() {
  const [billingPeriod, setBillingPeriod] = useState("yearly");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('GHS');
  const [exchangeRates, setExchangeRates] = useState({ GHS: 1, USD: 1, GBP: 1, EUR: 1, NGN: 1 });
  const [ratesLoading, setRatesLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Typing effect state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch exchange rates on component mount
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        setRatesLoading(true);
        // Using exchangerate-api.com (free tier)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/GHS');
        const data = await response.json();
        
        if (data && data.rates) {
          setExchangeRates({
            GHS: 1,
            USD: data.rates.USD || 0.0625,
            GBP: data.rates.GBP || 0.049,
            EUR: data.rates.EUR || 0.057,
            NGN: data.rates.NGN || 93.75,
          });
          setLastUpdated(new Date());
        }
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        // Fallback rates (approximate)
        setExchangeRates({
          GHS: 1,
          USD: 0.0625,  // 1 GHS â‰ˆ 0.0625 USD
          GBP: 0.049,   // 1 GHS â‰ˆ 0.049 GBP
          EUR: 0.057,   // 1 GHS â‰ˆ 0.057 EUR
          NGN: 93.75,   // 1 GHS â‰ˆ 93.75 NGN
        });
        setLastUpdated(null);
      } finally {
        setRatesLoading(false);
      }
    };

    fetchExchangeRates();
    // Refresh rates every 5 minutes for more live updates
    const interval = setInterval(fetchExchangeRates, 300000);
    return () => clearInterval(interval);
  }, []);

  // Live time display state
  const [liveTime, setLiveTime] = useState(new Date());
  
  // Update live time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time ago
  const getTimeAgo = (date) => {
    if (!date) return 'Using fallback rates';
    const seconds = Math.floor((liveTime - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

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
          "WhatsApp Chat Integration",
          "Google Map Integration",
          "Gallery",
          "Sitemap",
          "Website Analytics",
          "Security/Firewall",
          "Site Backups",
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
          "WhatsApp Chat Integration",
          "Google Map Integration",
          "Gallery",
          "Sitemap",
          "Contact Form",
          "Security/Firewall",
          "Site Backups",
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
          "Social Media Integration",
          "WhatsApp Chat Integration",
          "Google Map Integration",
          "Gallery",
          "Sitemap",
          "Contact Form",
          "Website Analytics",
          "Security/Firewall",
          "Site Backups",
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
          "Social Media Integration",
          "WhatsApp Chat Integration",
          "Google Map Integration",
          "Gallery",
          "Sitemap",
          "Contact Form",
          "Website Analytics",
          "Security/Firewall",
          "Site Backups",
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

  const formatPrice = (priceInGHS) => {
    const currency = currencies.find(c => c.code === selectedCurrency);
    const convertedPrice = priceInGHS * exchangeRates[selectedCurrency];
    
    // Format based on currency
    const formatted = new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: selectedCurrency === 'NGN' ? 0 : 2, 
      maximumFractionDigits: selectedCurrency === 'NGN' ? 0 : 2 
    }).format(convertedPrice);
    
    return `${currency.symbol}${formatted}`;
  };

  // Currency Selector Component - Horizontal Layout
  const CurrencySelector = () => {
    const handleCurrencyChange = (code) => {
      setSelectedCurrency(code);
    };

    return (
      <div className="w-full max-w-2xl mx-auto">
        {/* Horizontal currency buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {currencies.map((currency) => (
            <motion.button
              key={currency.code}
              onClick={(e) => {
                e.preventDefault();
                handleCurrencyChange(currency.code);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-300 cursor-pointer ${
                selectedCurrency === currency.code 
                  ? 'bg-white text-orange-600 shadow-lg ring-2 ring-orange-400' 
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
              style={{ fontFamily: "Google Sans, sans-serif" }}
            >
              <img 
                src={`https://flagcdn.com/w40/${currency.flag}.png`}
                alt={currency.code}
                className="w-6 h-4 sm:w-7 sm:h-5 object-cover rounded shadow-sm"
              />
              <span className={`font-bold ${selectedCurrency === currency.code ? 'text-orange-600' : 'text-white'}`}>
                {currency.symbol}
              </span>
              <span className={`font-semibold text-sm sm:text-base ${selectedCurrency === currency.code ? 'text-gray-700' : 'text-white/90'}`}>
                {currency.code}
              </span>
              {selectedCurrency === currency.code && (
                <Check size={16} className="text-orange-500 hidden sm:block" />
              )}
            </motion.button>
          ))}
        </div>
        
        {/* Live rate indicator */}
        <div className="flex items-center justify-center mt-3 space-x-2">
          <div className={`w-2 h-2 rounded-full ${ratesLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400 animate-pulse'}`}></div>
          <span className="text-xs text-white/80" style={{ fontFamily: "Google Sans, sans-serif" }}>
            {ratesLoading ? 'Updating rates...' : `Live rates • Updated ${getTimeAgo(lastUpdated)}`}
          </span>
        </div>
      </div>
    );
  };

  const toggleAddOn = (addOnName) => setAddOns(prev => ({ ...prev, [addOnName]: !prev[addOnName] }));
  const updateQuantity = (field, delta) => setAddOns(prev => ({ ...prev, [field]: Math.max(0, prev[field] + delta) }));
  const resetCalculator = () => {
    setSelectedBase("starter");
    setAddOns({ extraPages: 0, ecommerce: false, blog: false, seo: false, maintenance: false, mobileApp: false, customFeatures: 0 });
  };

  const currentPlanMeta = pricingPlans.find(plan => plan.name.toLowerCase() === selectedBase) || pricingPlans[0];

  const getWhatsAppLink = (planName, priceInGHS) => {
    const formattedPrice = formatPrice(priceInGHS);
    const ghsPrice = `₵${new Intl.NumberFormat('en-GH', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(priceInGHS)}`;
    const message = `Hi Celestial Web Solutions! I'm interested in your ${planName} package priced at ${formattedPrice} (${ghsPrice} GHS). Can you provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/233530505031?text=${encodedMessage}`;
  };

  const getCalculatorWhatsAppLink = () => {
    const total = calculateTotal();
    const formattedPrice = formatPrice(total);
    const ghsPrice = `₵${new Intl.NumberFormat('en-GH', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(total)}`;
    const message = `Hi! I calculated a custom quote using your calculator: ${formattedPrice} (${ghsPrice} GHS). Can we discuss this package?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/233530505031?text=${encodedMessage}`;
  };

  // Typing effect logic
  useEffect(() => {
    const currentPhrase = typingPhrases[currentPhraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
        }
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentPhraseIndex]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans">
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
            <div className="flex flex-col items-center justify-center mb-4 min-h-[2.5em]">
              <span className="text-lg md:text-2xl text-white bg-black/20 px-4 py-2 rounded-full font-semibold tracking-wide shadow-lg animate-pulse" style={{ fontFamily: 'Google Sans, sans-serif', letterSpacing: '0.04em' }}>
                {displayText}<span className="animate-pulse">|</span>
              </span>
            </div>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "Google Sans, sans-serif" }}>
              Quality web development services at affordable rates. No hidden fees, flexible payment plans, and prices in Ghana Cedis.
            </p>

            {/* Currency Selector */}
            <div className="mb-8 px-2">
              <p className="text-white/90 text-sm font-medium mb-3" style={{ fontFamily: "Google Sans, sans-serif" }}>
                View prices in your currency:
              </p>
              <CurrencySelector />
            </div>

            {/* Billing Toggle */}
            <div className="inline-flex items-center justify-center space-x-4 bg-white/20 backdrop-blur-sm rounded-2xl p-2 flex-wrap">
              <button onClick={() => setBillingPeriod("monthly")} className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${billingPeriod === "monthly" ? "bg-white text-orange-600 shadow-lg" : "text-white hover:bg-white/10"}`} style={{ fontFamily: "Google Sans, sans-serif" }}>
                Development Packages
              </button>
              <button onClick={() => setBillingPeriod("yearly")} className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 relative ${billingPeriod === "yearly" ? "bg-white text-orange-600 shadow-lg" : "text-white hover:bg-white/10"}`} style={{ fontFamily: "Google Sans, sans-serif" }}>
                With Maintenance
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-800 text-xs px-2 py-1 rounded-full font-bold" style={{ fontFamily: "Google Sans, sans-serif" }}>Save</span>
              </button>
            </div>

            {/* Calculator Toggle Button */}
            <motion.button onClick={() => setShowCalculator(!showCalculator)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6 inline-flex items-center space-x-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" style={{ fontFamily: "Google Sans, sans-serif" }}>
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
                      <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>Build your perfect package</p>
                    </div>
                  </div>
                  <button onClick={resetCalculator} className="text-gray-600 dark:text-gray-400 hover:text-orange-600 transition-colors text-sm font-medium" style={{ fontFamily: "Google Sans, sans-serif" }}>Reset</button>
                </div>

                {/* Base Package Selection */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>1. Choose Your Base Package</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["starter", "professional", "ecommerce", "enterprise"].map((pkg) => (
                      <button key={pkg} onClick={() => setSelectedBase(pkg)} className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedBase === pkg ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20 shadow-lg" : "border-gray-200 dark:border-gray-700 hover:border-orange-300 bg-white dark:bg-gray-800"}`}>
                        <div className="font-bold text-gray-900 dark:text-white capitalize mb-1" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{pkg}</div>
                        <div className="text-orange-600 font-semibold" style={{ fontFamily: "Google Sans, sans-serif" }}>{formatPrice(basePrices[pkg])}</div>
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
                        <div className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>{formatPrice(addOnPrices.extraPages)} per page</div>
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
                      { key: "maintenance", label: "Annual Maintenance", price: addOnPrices.maintenance * 12, note: "â‚µ150/month" },
                      { key: "mobileApp", label: "Mobile App Development", price: addOnPrices.mobileApp }
                    ].map((addon) => (
                      <div key={addon.key} className={`flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors ${addon.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"}`} onClick={() => !addon.disabled && toggleAddOn(addon.key)}>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{addon.label}</span>
                            {addon.disabled && <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded" style={{ fontFamily: "Google Sans, sans-serif" }}>Included</span>}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>{formatPrice(addon.price)} {addon.note && <span className="ml-1">({addon.note})</span>}</div>
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
                        <div className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>{formatPrice(addOnPrices.customFeatures)} per feature</div>
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
                    <div className="text-gray-700 dark:text-gray-300 font-semibold" style={{ fontFamily: "Google Sans, sans-serif" }}>Total Price ({billingPeriod === "yearly" ? "Yearly" : "Yearly"}):</div>
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

      {/* January 2026 Launch Promo Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 px-4 bg-orange-600 relative overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPromo(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full transition-all hover:rotate-90 duration-300 group"
              aria-label="Close promotion"
            >
              <X size={24} className="text-white group-hover:text-red-500 transition-colors" />
            </button>

            <div className="relative z-10 max-w-5xl mx-auto">
              {/* Limited offer badge */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="flex justify-center mb-6"
              >
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  <Zap size={18} className="text-orange-600" />
                  LIMITED TIME OFFER - FIRST 10 CLIENTS ONLY
                  <Zap size={18} className="text-orange-600" />
                </div>
              </motion.div>

              {/* Main heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-3" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                  JANUARY 2026 LAUNCH SPECIAL
                </h2>
                <p className="text-xl md:text-2xl text-white/90 font-semibold" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  Book before January 31st and receive incredible bonuses!
                </p>
              </motion.div>

              {/* Benefits grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl mb-8"
              >
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Trophy, text: "GH₵500 discount", subtext: "(Professional & E-Commerce packages)" },
                    { icon: Gift, text: "Free logo design", subtext: "(GH₵500 value)" },
                    { icon: TrendingUp, text: "Free competitor analysis", subtext: "(GH₵800 value)" },
                    { icon: Rocket, text: "Priority project slot", subtext: "(skip the wait)" },
                    { icon: Award, text: "1 month free priority support", subtext: "(GH₵500 value)" },
                  ].map((benefit, idx) => {
                    const IconComponent = benefit.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10"
                      >
                        <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">
                          <IconComponent size={24} className="text-yellow-300" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-lg" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                            {benefit.text}
                          </p>
                          <p className="text-white/80 text-sm" style={{ fontFamily: "Google Sans, sans-serif" }}>
                            {benefit.subtext}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Value summary */}
                <div className="border-t-2 border-white/20 pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="text-center md:text-left">
                      <p className="text-white/90 text-lg mb-1" style={{ fontFamily: "Google Sans, sans-serif" }}>Total Value:</p>
                      <p className="text-white font-bold text-3xl md:text-4xl" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>GH₵2,300+</p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-white/90 text-lg mb-1" style={{ fontFamily: "Google Sans, sans-serif" }}>Your Investment:</p>
                      <p className="text-yellow-300 font-bold text-3xl md:text-4xl" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Package Price - GH₵500</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                      href="https://wa.me/233530505031?text=Hi!%20I%20want%20to%20claim%20the%20January%202026%20Launch%20Special%20offer!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      <Smartphone size={24} />
                      Claim Your Spot Now →
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/20 hover:bg-white/30 text-white rounded-xl font-bold text-lg border-2 border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl transition-all"
                      style={{ fontFamily: "Google Sans, sans-serif" }}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Urgency footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 text-white font-bold text-lg bg-red-600/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-3" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  <Clock size={20} className="text-yellow-300" />
                  Limited to first 10 clients who book before Jan 31, 2026
                </div>
                <p className="text-white/70 text-sm" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  * Terms & Conditions apply
                </p>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-6" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Our Packages</h2>
          
          {/* Exchange Rate Info Bar */}
          <div className="bg-gradient-to-r from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 mb-12">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${ratesLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300" style={{ fontFamily: "Google Sans, sans-serif" }}>
                  Live Rates:
                </span>
              </div>
              {currencies.filter(c => c.code !== 'GHS').map((currency) => (
                <div 
                  key={currency.code}
                  onClick={() => setSelectedCurrency(currency.code)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedCurrency === currency.code 
                      ? 'bg-orange-500 text-white shadow-lg scale-105' 
                      : 'bg-white dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <img 
                    src={`https://flagcdn.com/w20/${currency.flag}.png`}
                    alt={currency.code}
                    className="w-5 h-3.5 object-cover rounded shadow-sm"
                  />
                  <span className={`text-sm font-bold ${selectedCurrency === currency.code ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`} style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                    {currency.symbol}{exchangeRates[currency.code]?.toFixed(currency.code === 'NGN' ? 2 : 4)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-3 space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {ratesLoading ? '🔄 Updating rates...' : `⏱️ Updated ${getTimeAgo(lastUpdated)}`}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                🕐 {liveTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className={`border rounded-2xl p-6 shadow-lg relative bg-white dark:bg-gray-800 ${plan.popular ? "border-orange-500" : "border-gray-200 dark:border-gray-700"}`}>
                {plan.popular && <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>}
                <plan.icon className="text-orange-500 mb-4" size={32} />
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ fontFamily: "Google Sans, sans-serif" }}>{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{formatPrice(plan.price[billingPeriod])}</span>
                  <span className="text-sm line-through text-gray-400 ml-2">{formatPrice(plan.originalPrice ? plan.originalPrice[billingPeriod] : plan.price[billingPeriod])}</span>
                </div>
                <ul className="mb-6 space-y-2 text-gray-700 dark:text-gray-300 text-sm" style={{ fontFamily: "Google Sans, sans-serif" }}>
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

      {/* Package Comparison Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
              Compare Our Packages
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg" style={{ fontFamily: "Google Sans, sans-serif" }}>
              Find the perfect plan that matches your business needs
            </p>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            {/* Scroll indicator for mobile/tablet */}
            <div className="lg:hidden bg-orange-100 dark:bg-orange-900/20 px-4 py-2 text-center border-b border-orange-200 dark:border-orange-800">
              <p className="text-sm text-orange-700 dark:text-orange-300 font-semibold flex items-center justify-center gap-2" style={{ fontFamily: "Google Sans, sans-serif" }}>
                <ArrowRight size={16} className="animate-pulse" />
                Swipe left to see all features
                <ArrowRight size={16} className="animate-pulse" />
              </p>
            </div>
            
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <th className="px-6 py-4 text-left font-bold" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Features</th>
                  <th className="px-6 py-4 text-center font-bold" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Starter</th>
                  <th className="px-6 py-4 text-center font-bold" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Professional</th>
                  <th className="px-6 py-4 text-center font-bold" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>E-Commerce</th>
                  <th className="px-6 py-4 text-center font-bold" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {/* Price Row */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Starting Price</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {formatPrice(pricingPlans[0].price[billingPeriod])}
                    </span>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">first year</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {formatPrice(pricingPlans[1].price[billingPeriod])}
                    </span>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">first year</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {formatPrice(pricingPlans[2].price[billingPeriod])}
                    </span>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">first year</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-2xl font-bold text-orange-600" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {formatPrice(pricingPlans[3].price[billingPeriod])}
                    </span>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">first year</div>
                  </td>
                </tr>

                {/* Delivery Time */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Delivery Time</td>
                  {pricingPlans.map((plan, idx) => (
                    <td key={idx} className="px-6 py-4 text-center text-gray-700 dark:text-gray-300" style={{ fontFamily: "Google Sans, sans-serif" }}>
                      {plan.deliveryTime}
                    </td>
                  ))}
                </tr>

                {/* Number of Pages */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Pages Included</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">5 Pages</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">10 Pages</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">Unlimited</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">Unlimited</td>
                </tr>

                {/* Mobile Responsive */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Mobile Responsive</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* SEO Optimization */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>SEO Optimization</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Full Custom</td>
                </tr>

                {/* Email Support */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Email Support</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Phone Support */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Phone Support</td>
                  {[false, false, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* E-Commerce Features */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>E-Commerce Features</td>
                  {[false, false, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Blog Integration */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Blog/News Section</td>
                  {[false, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Payment Gateway */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Payment Integration</td>
                  {[false, false, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Database */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Database Integration</td>
                  {[false, false, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Revisions */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Revisions Included</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">2 Rounds</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">5 Rounds</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">Unlimited</td>
                  <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">Unlimited</td>
                </tr>

                {/* Hosting & Domain */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Free Domain & Hosting</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">1 Year</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">1 Year</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">1 Year</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">1 Year</td>
                </tr>

                {/* SSL Certificate */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>SSL Certificate</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Premium</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">Advanced</td>
                </tr>

                {/* Maintenance */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Free Maintenance</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">None</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">None</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">None</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">6 Months</td>
                </tr>

                {/* WhatsApp Chat */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>WhatsApp Chat</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Social Media Integration */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Social Media Integration</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Google Map Integration */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Google Map Integration</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Security/Firewall */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Security/Firewall</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Gallery */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Gallery</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Sitemap */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Sitemap</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Contact Form */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Contact Form</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Support */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Support</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Site Backups */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Site Backups</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* Website Analytics */}
                <tr className="bg-white dark:bg-gray-900 hover:bg-orange-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Website Analytics</td>
                  {[true, true, true, true].map((value, idx) => (
                    <td key={idx} className="px-6 py-4 text-center">
                      {value ? <Check size={20} className="mx-auto text-green-500" /> : <X size={20} className="mx-auto text-red-500" />}
                    </td>
                  ))}
                </tr>

                {/* CTA Row */}
                <tr className="bg-gradient-to-r from-gray-100 to-orange-50 dark:from-gray-800 dark:to-gray-700">
                  <td className="px-6 py-6"></td>
                  {pricingPlans.map((plan, idx) => (
                    <td key={idx} className="px-6 py-6 text-center">
                      <PremiumCTA 
                        href={getWhatsAppLink(plan.name, plan.price[billingPeriod])} 
                        size="sm" 
                        variant="primary" 
                        className="w-full justify-center whitespace-nowrap"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Get Started
                      </PremiumCTA>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>
            <p>✓ Feature included • ✗ Feature not included</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Comparison Table */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              Why Choose Us
            </h2>
            <p className="text-lg mb-2 text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              See how Celestial Web Solutions compares to in-house teams and freelancers
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <th className="px-6 py-4 text-left font-bold" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Features</th>
                  <th className="px-6 py-4 text-center font-bold" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Celestial Web Solutions</th>
                  <th className="px-6 py-4 text-center font-bold" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>In-house Team</th>
                  <th className="px-6 py-4 text-center font-bold" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Freelancers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-white dark:bg-gray-900">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Cost</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600" style={{ fontFamily: 'Google Sans, sans-serif' }}>Get the power of a team at an individual price.</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Significant ongoing team expense (salaries + overhead)</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Hidden costs due management and communication gaps</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Project Failure Potential</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600" style={{ fontFamily: 'Google Sans, sans-serif' }}>None</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>The effectiveness depends on how you choose the team</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Freelancers often have multiple clients, which can be a problem</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Track Record</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600" style={{ fontFamily: 'Google Sans, sans-serif' }}>Experience honed through successful projects</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>No Experience</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Different experience and only on one field of work</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Time to Start</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600" style={{ fontFamily: 'Google Sans, sans-serif' }}>Instant</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Finding the right experts depends on the specific skills needed, potentially taking several months</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>The time it takes to begin working with a freelancer depends on their schedule</td>
                </tr>
                <tr className="bg-white dark:bg-gray-900">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>Cost-effectiveness</td>
                  <td className="px-6 py-4 text-center font-semibold text-orange-600" style={{ fontFamily: 'Google Sans, sans-serif' }}>Trained team</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>A 3-month training period may be necessary to ensure the team has the necessary skills</td>
                  <td className="px-6 py-4 text-center text-gray-900 dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Building a team and establishing clear communication channels can be a time investment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Banner */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            Have questions about our pricing or process?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/faqs" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all backdrop-blur-md bg-white/30 hover:bg-white/50 text-blue-900 dark:text-blue-100 border border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl"
              style={{ fontFamily: "Google Sans, sans-serif" }}
            >
              View All FAQs →
            </a>
            <a 
              href="/schedule-a-call" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all backdrop-blur-md bg-white/30 hover:bg-white/50 text-orange-900 dark:text-orange-100 border border-white/40 hover:border-white/60 shadow-lg hover:shadow-xl"
              style={{ fontFamily: "Google Sans, sans-serif" }}
            >
              Book Free Consultation →
            </a>
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-12 px-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            We Accept
          </h3>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center">
            <div className="h-16 w-32 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-2 hover:shadow-md transition-shadow">
              <img src="/mtn-momo-logo.png" alt="MTN MoMo" className="max-h-14 max-w-28 object-contain" />
            </div>
            <div className="h-16 w-32 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-2 hover:shadow-md transition-shadow">
              <img src="/telecel-logo.webp" alt="Telecel Cash" className="max-h-14 max-w-28 object-contain" />
            </div>
            <div className="h-16 w-32 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-2 hover:shadow-md transition-shadow">
              <img src="/paystack-logo.png" alt="Paystack" className="max-h-14 max-w-28 object-contain" />
            </div>
            <div className="h-16 w-32 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg p-2 hover:shadow-md transition-shadow">
              <img src="/fidelity-bank-logo.jpg" alt="Fidelity Bank" className="max-h-14 max-w-28 object-contain" />
            </div>
          </div>
          <p className="mt-8 text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: "Google Sans, sans-serif" }}>
            Flexible payment options to suit your convenience
          </p>
          <div className="mt-6">
            <a 
              href="/payment" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              style={{ fontFamily: "Google Sans, sans-serif" }}
            >
              View Payment Details →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 text-white text-center relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(255,107,0,0.9) 0%, rgba(234,88,12,0.9) 100%), url("/hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>Ready to Start Your Project?</h2>
        <p className="text-lg mb-8 relative z-10" style={{ fontFamily: "Google Sans, sans-serif" }}>Get in touch today and let's build your online presence together!</p>
        <div className="relative z-10">
          <PremiumCTA href="/contact" size="default" variant="outline">
            Contact Us
          </PremiumCTA>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}