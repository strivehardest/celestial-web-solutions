import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Check,
  Copy,
  ExternalLink,
  CreditCard,
  Building2,
  Smartphone,
  Shield,
  ArrowRight
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import PremiumCTA from '../components/PremiumCTA';

const typingPhrases = [
  'Pay with MTN Mobile Money',
  'Pay with Telecel Cash',
  'Pay securely via Paystack',
  'Pay with Fidelity Bank Transfer',
  'Fast, Secure, Trusted Payments',
  'Contact: +233 24 567 1832',
  'Chat on WhatsApp: +233 53 050 5031',
  'info@celestialwebsolutions.net',
];

export default function PaymentPage() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [copied, setCopied] = useState('');

  // Typing effect state
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    document.title = 'Secure Payment | Celestial Web Solutions | Pay for Web Design in Ghana';
  }, []);

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

  const copyToClipboard = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(''), 2000);
    }
  };

  const paymentOptions = [
    {
      id: 1,
      title: "MTN Mobile Money",
      subtitle: "Pay instantly with MTN MoMo",
      icon: Smartphone,
      color: "from-yellow-400 to-yellow-500",
      details: {
        number: "705992",
        name: "Celestial Web Solutions"
      },
      logo: "/mtn-momo-logo.png"
    },
    {
      id: 2,
      title: "Telecel Cash",
      subtitle: "Pay easily with Telecel Money",
      icon: Smartphone,
      color: "from-red-500 to-red-600",
      details: {
        number: "0209044550",
        name: "Waliu Ibrahimah Aforlabi"
      },
      logo: "/telecel-logo.webp"
    },
    {
      id: 3,
      title: "Paystack Payment",
      subtitle: "Secure online payment gateway",
      icon: CreditCard,
      color: "from-blue-500 to-blue-600",
      details: {
        link: "paystack.shop/pay/payment-for-celestial"
      },
      logo: "/paystack-logo.png"
    },
    {
      id: 4,
      title: "Fidelity Bank Transfer",
      subtitle: "Direct bank transfer for large payments",
      icon: Building2,
      color: "from-orange-500 to-orange-600",
      details: {
        accountNumber: "2400251299814",
        accountName: "Waliu Ibrahimah Aforlabi",
        bank: "Fidelity Bank",
        branch: "Ho Branch",
        swiftCode: "FBLIGHAC"
      },
      logo: "/fidelity-bank-logo.jpg"
    }
  ];

  return (
    <>
      <Head>
        <title>Secure Payment Options | Celestial Web Solutions Ghana</title>
        <meta
          name="description"
          content="Pay securely for web design, website development, and digital services with Celestial Web Solutions. Accepting MTN MoMo, Telecel Cash, Paystack, and Fidelity Bank transfers."
        />
        <meta
          name="keywords"
          content="Celestial Web Solutions payment, web design Ghana, website payment Ghana, MTN MoMo web design, Telecel Cash website, Paystack Ghana, Fidelity Bank transfer web design, secure payment Ghana"
        />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 via-orange-500 to-red-200 dark:from-gray-800 dark:via-gray-900 dark:to-black overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/dollar.webp"
            alt="Secure web payment Ghana background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="text-white" size={48} />
            <h1
              className="text-4xl md:text-6xl font-bold text-white"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Secure Payment Options
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 min-h-[2.5em]">
            <span className="text-lg md:text-2xl text-white bg-black/20 px-4 py-2 rounded-full font-semibold tracking-wide shadow-lg animate-pulse" style={{ fontFamily: 'Google Sans, sans-serif', letterSpacing: '0.04em' }}>
              {displayText}<span className="animate-pulse">|</span>
            </span>
          </div>
          <p
            className="text-lg text-white/90 max-w-3xl mx-auto"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            Pay securely for web design, website development, and digital services with Celestial Web Solutions. Accepting MTN MoMo, Telecel Cash, Paystack, and Fidelity Bank transfers.
          </p>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-3xl font-bold text-center mb-10 text-orange-600 dark:text-orange-400"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            Select Your Payment Method
          </h2>

          <div className="space-y-6" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            {paymentOptions.map(option => (
              <div
                key={option.id}
                className={`border-2 rounded-2xl overflow-hidden transition-all ${
                  selectedOption === option.id
                    ? 'border-orange-500 shadow-lg ring-4 ring-orange-100 dark:ring-orange-800'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div
                  className={`p-6 bg-gradient-to-r ${option.color} cursor-pointer`}
                  onClick={() =>
                    setSelectedOption(selectedOption === option.id ? null : option.id)
                  }
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={option.logo}
                        alt={`${option.title} logo`}
                        className="w-12 h-12 rounded-lg object-contain"
                      />
                      <div>
                        <h3
                          className="text-2xl font-bold text-white"
                          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
                        >
                          {option.title}
                        </h3>
                        <p className="text-white/90">{option.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight
                      className={`text-white transition-transform duration-300 ${
                        selectedOption === option.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {selectedOption === option.id && (
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 dark:text-gray-200 transition-colors duration-500">
                    {(option.id === 1 || option.id === 2) && (
                      <>
                        <div className="flex justify-between bg-white dark:bg-gray-700 p-3 rounded-lg mb-3">
                          <span>{option.id === 1 ? 'MoMo Pay Number:' : 'Telecel Cash Number:'}</span>
                          <div className="flex items-center space-x-2">
                            <strong>{option.details.number}</strong>
                            <button onClick={() => copyToClipboard(option.details.number, 'num')}>
                              <Copy size={16} className="text-orange-500" />
                            </button>
                            {copied === 'num' && <Check size={16} className="text-green-500" />}
                          </div>
                        </div>
                        <div className="flex justify-between bg-white dark:bg-gray-700 p-3 rounded-lg">
                          <span>Name:</span>
                          <strong>{option.details.name}</strong>
                        </div>
                      </>
                    )}

                    {option.id === 3 && (
                      <PremiumCTA
                        href={`https://${option.details.link}`}
                        size="small"
                        variant="primary"
                        external={true}
                        className="mt-4"
                        icon={false}
                      >
                        Pay with Paystack
                        <ExternalLink size={18} style={{ marginLeft: 8 }} />
                      </PremiumCTA>
                    )}

                    {option.id === 4 && (
                      <div className="space-y-3">
                        {Object.entries(option.details).map(([label, value]) => (
                          <div
                            key={label}
                            className="flex justify-between bg-white dark:bg-gray-700 p-3 rounded-lg"
                          >
                            <span className="capitalize">
                              {label.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center transition-colors duration-500"
        style={{ fontFamily: 'Google Sans, sans-serif' }}
      >
        <h3
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          Need Help with Payment?
        </h3>
        <p className="text-orange-100 mb-6">
          Call or WhatsApp us for instant support on your payment or service confirmation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <PremiumCTA href="tel:+233245671832" size="default" variant="outline">
            Call +233 24 567 1832
          </PremiumCTA>
          <PremiumCTA href="https://wa.me/233530505031" size="default" variant="outline" target="_blank" rel="noopener noreferrer">
            Chat on WhatsApp
          </PremiumCTA>
        </div>
      </section>

      <WhatsAppButton />
    </>
  );
}
