import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, ChevronDown, Globe, Loader2, Plus } from 'lucide-react';
import CelestialAIMarkdown from '../components/CelestialAIMarkdown';
import CelestialAIMark from '../components/CelestialAIMark';
import { GUEST_DAILY_LIMIT, LANGUAGE_NAMES, SUGGESTED_QUESTIONS } from '../lib/celestialAI/config';

const HEADING_FONT = { fontFamily: 'Bricolage Grotesque, sans-serif' };
const BODY_FONT = { fontFamily: 'Albert Sans, sans-serif' };
const GUEST_KEY = 'celestial-ai-guest';
const CHAT_KEY = 'celestial-ai-chat';
const LANG_KEY = 'celestial-ai-language';
const WHATSAPP_URL = 'https://wa.me/233530505031?text=Hi%20Celestial%20Web%20Solutions%2C%20I%20have%20a%20question.';

const todayKey = () => new Date().toISOString().slice(0, 10);

function readGuestUsage() {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = window.localStorage.getItem(GUEST_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    return parsed.date === todayKey() ? Number(parsed.used) || 0 : 0;
  } catch (_) {
    return 0;
  }
}

function writeGuestUsage(used) {
  try {
    window.localStorage.setItem(GUEST_KEY, JSON.stringify({ date: todayKey(), used }));
  } catch (_) {
    /* storage unavailable */
  }
}

let idCounter = 0;
const nextId = () => `${Date.now().toString(36)}-${idCounter++}`;

export default function CelestialAIPage({ liveModel = false }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');
  const [isSending, setIsSending] = useState(false);
  const [guestUsed, setGuestUsed] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setGuestUsed(readGuestUsage());
    try {
      const savedLang = window.localStorage.getItem(LANG_KEY);
      if (savedLang && LANGUAGE_NAMES[savedLang]) setLanguage(savedLang);
      const savedChat = window.sessionStorage.getItem(CHAT_KEY);
      if (savedChat) {
        const parsed = JSON.parse(savedChat);
        if (Array.isArray(parsed)) setMessages(parsed.filter((m) => m && m.role && m.content));
      }
    } catch (_) {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(CHAT_KEY, JSON.stringify(messages.slice(-30)));
    } catch (_) {
      /* ignore */
    }
  }, [messages, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(LANG_KEY, language);
    } catch (_) {
      /* ignore */
    }
  }, [language, hydrated]);

  useEffect(() => {
    if (messages.length) bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  const remaining = Math.max(0, GUEST_DAILY_LIMIT - guestUsed);
  const limitReached = remaining === 0;
  const hasConversation = messages.length > 0;

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  const sendMessage = useCallback(
    async (rawText) => {
      const text = (rawText ?? input).trim();
      if (!text || isSending || limitReached) return;

      const userMessage = { id: nextId(), role: 'user', content: text };
      const history = [...messages, userMessage];
      setMessages(history);
      setInput('');
      setIsSending(true);
      requestAnimationFrame(resizeTextarea);

      try {
        const response = await fetch('/api/celestial-ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language,
            messages: history.slice(-12).map(({ role, content }) => ({ role, content })),
          }),
        });
        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(data.error || 'Celestial AI could not answer right now.');
        }

        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', content: data.reply, source: data.source },
        ]);
        const used = readGuestUsage() + 1;
        writeGuestUsage(used);
        setGuestUsed(used);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId(),
            role: 'assistant',
            error: true,
            content: `${error.message} You can also reach the team directly on [WhatsApp](${WHATSAPP_URL}) or call [+233 24 567 1832](tel:+233245671832).`,
          },
        ]);
      } finally {
        setIsSending(false);
        textareaRef.current?.focus();
      }
    },
    [input, isSending, limitReached, messages, language, resizeTextarea]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setInput('');
    try {
      window.sessionStorage.removeItem(CHAT_KEY);
    } catch (_) {
      /* ignore */
    }
    textareaRef.current?.focus();
  };

  const languageOptions = useMemo(() => Object.entries(LANGUAGE_NAMES), []);

  return (
    <>
      <Head>
        <title>Celestial AI | Web Development Assistant &amp; Agency Comparison | Celestial Web Solutions</title>
        <meta
          name="description"
          content="Ask Celestial AI about web development, website pricing in Ghana Cedis, Paystack and MoMo payments, timelines, and how Celestial Web Solutions compares to other web design agencies in Ghana and worldwide."
        />
        <meta
          name="keywords"
          content="Celestial AI, Celestial Web Solutions, web development Ghana, compare web design agencies Ghana, website cost Ghana, web agency comparison, best web designer Accra, Paystack USSD, WordPress vs Next.js, web development Ghana vs USA"
        />
        <meta name="author" content="Celestial Web Solutions" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://www.celestialwebsolutions.net/celestial-ai" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Celestial Web Solutions" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Celestial AI | Ask About Web Development &amp; Compare Agencies" />
        <meta
          property="og:description"
          content="Instant answers on web development, Ghana pricing, payments, and how Celestial Web Solutions compares to other agencies."
        />
        <meta property="og:url" content="https://www.celestialwebsolutions.net/celestial-ai" />
        <meta property="og:image" content="https://www.celestialwebsolutions.net/og-image.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@strivehardest" />
        <meta name="twitter:title" content="Celestial AI | Web Development Assistant" />
        <meta
          name="twitter:description"
          content="Ask about web development, Ghana website pricing, and compare Celestial Web Solutions to other agencies."
        />
        <meta name="twitter:image" content="https://www.celestialwebsolutions.net/og-image.jpg" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebApplication',
                  '@id': 'https://www.celestialwebsolutions.net/celestial-ai#app',
                  name: 'Celestial AI',
                  url: 'https://www.celestialwebsolutions.net/celestial-ai',
                  applicationCategory: 'BusinessApplication',
                  operatingSystem: 'Web',
                  description:
                    'AI assistant for Celestial Web Solutions that answers questions about web development, pricing in Ghana Cedis, payments, timelines, and agency comparisons.',
                  offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'GHS',
                  },
                  provider: {
                    '@type': 'Organization',
                    name: 'Celestial Web Solutions',
                    url: 'https://www.celestialwebsolutions.net',
                    logo: 'https://www.celestialwebsolutions.net/logo.png',
                  },
                },
                {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Home',
                      item: 'https://www.celestialwebsolutions.net/',
                    },
                    {
                      '@type': 'ListItem',
                      position: 2,
                      name: 'Celestial AI',
                      item: 'https://www.celestialwebsolutions.net/celestial-ai',
                    },
                  ],
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'How does Celestial Web Solutions compare to other web agencies?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Compare agencies on portfolio, transparent GH₵ pricing, Ghana payment options (Paystack, MoMo, Telecel, USSD), written timelines and warranty, code ownership, post-launch support, and whether you speak to the builder. Celestial publishes package prices from GH₵2,500, offers WordPress and custom Next.js tiers, and includes free domain and hosting for the first year.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How much does a website cost in Ghana?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Celestial Web Solutions websites start from GH₵2,500 for a Starter WordPress site and range up to GH₵28,000 for Enterprise custom builds. E-commerce starts from GH₵4,500.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What is Celestial AI?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Celestial AI is a free chat assistant on celestialwebsolutions.net that answers questions about Celestial Web Solutions services, web development basics, Ghana vs global pricing, and how the agency compares to freelancers, local studios and international firms.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </Head>

      <div className="min-h-screen bg-white pt-[72px] dark:bg-gray-950" style={BODY_FONT}>
        <main className="mx-auto w-full max-w-3xl px-4 pb-[210px] sm:px-6">
          {!hasConversation ? (
            <section className="flex min-h-[calc(100vh-72px-210px)] flex-col items-center justify-center py-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <CelestialAIMark size="lg" className="mb-6" />
                <h1
                  className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-5xl"
                  style={HEADING_FONT}
                >
                  Ask Celestial AI
                </h1>
                <p className="mt-3 max-w-xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
                  Ask about web development, compare Celestial Web Solutions to other agencies, check pricing in Cedis, and see how building in Ghana stacks up against the rest of the world.
                </p>
              </motion.div>

              <div className="mt-10 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <motion.button
                    key={question}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => sendMessage(question)}
                    disabled={limitReached || isSending}
                    className="group rounded-2xl border border-gray-200 bg-white p-4 text-left text-[15px] leading-snug text-gray-800 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-200 dark:hover:border-orange-400/60"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </section>
          ) : (
            <section className="space-y-6 py-8" aria-live="polite">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && <AssistantAvatar />}
                    <div
                      className={
                        message.role === 'user'
                          ? 'max-w-[85%] rounded-2xl rounded-br-md bg-orange-500 px-4 py-3 text-[15px] leading-relaxed text-white shadow-sm'
                          : `max-w-[92%] rounded-2xl rounded-bl-md border px-4 py-3 text-gray-800 shadow-sm dark:text-gray-200 ${
                              message.error
                                ? 'border-red-200 bg-red-50 dark:border-red-500/30 dark:bg-red-500/10'
                                : 'border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-white/[0.04]'
                            }`
                      }
                    >
                      {message.role === 'user' ? (
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        <CelestialAIMarkdown text={message.content} />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isSending && (
                <div className="flex gap-3">
                  <AssistantAvatar />
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-gray-200 bg-gray-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="h-2 w-2 animate-bounce rounded-full bg-orange-500"
                        style={{ animationDelay: `${dot * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {limitReached && !isSending && (
                <div className="mx-auto max-w-lg rounded-2xl border border-orange-200 bg-orange-50 p-4 text-center text-sm text-gray-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-gray-200">
                  You have used today&apos;s {GUEST_DAILY_LIMIT} free questions. Come back tomorrow, or talk to a human now on{' '}
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-orange-600 underline dark:text-orange-400">
                    WhatsApp
                  </a>{' '}
                  or via the{' '}
                  <Link href="/contact" className="font-semibold text-orange-600 underline dark:text-orange-400">
                    contact page
                  </Link>
                  .
                </div>
              )}
              <div ref={bottomRef} />
            </section>
          )}
        </main>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-white/10 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/80">
          <div className="mx-auto w-full max-w-3xl px-4 pb-4 pt-3 sm:px-6">
            <div className="mb-2 flex items-center justify-between gap-3">
              {hasConversation ? (
                <button
                  type="button"
                  onClick={startNewChat}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                  New chat
                </button>
              ) : (
                <span />
              )}
                <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                  limitReached
                    ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300'
                    : 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/10 dark:text-orange-300'
                }`}
                title={`Guests can ask ${GUEST_DAILY_LIMIT} questions per day`}
              >
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                  <path d="M8 1.2l1.35 3.55L13 6.1l-3.65 1.35L8 11l-1.35-3.55L3 6.1l3.65-1.35L8 1.2z" />
                </svg>
                {hydrated ? `Guest: ${remaining} left` : 'Guest'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="celestial-ai-composer">
              <div className="celestial-ai-composer-inner">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                  resizeTextarea();
                }}
                onKeyDown={handleKeyDown}
                placeholder={limitReached ? 'Daily guest limit reached' : 'Ask anything'}
                disabled={limitReached}
                maxLength={1500}
                aria-label="Ask Celestial AI"
                className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:cursor-not-allowed dark:text-white"
              />

              {liveModel && (
                <label className="relative hidden shrink-0 sm:block">
                  <span className="sr-only">Language</span>
                  <Globe className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="h-11 appearance-none rounded-xl border border-gray-200 bg-white pl-8 pr-8 text-sm font-medium text-gray-700 focus:border-orange-400 focus:outline-none dark:border-white/10 dark:bg-gray-900 dark:text-gray-200"
                  >
                    {languageOptions.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                </label>
              )}

              <button
                type="submit"
                disabled={!input.trim() || isSending || limitReached}
                aria-label="Send"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md shadow-orange-500/30 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowUp className="h-5 w-5" />}
              </button>
              </div>
            </form>

            {liveModel && (
              <div className="mt-2 flex items-center justify-between gap-3 sm:hidden">
                <label className="relative block">
                  <span className="sr-only">Language</span>
                  <Globe className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="h-8 appearance-none rounded-lg border border-gray-200 bg-white pl-7 pr-7 text-xs font-medium text-gray-700 focus:outline-none dark:border-white/10 dark:bg-gray-900 dark:text-gray-200"
                  >
                    {languageOptions.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
                </label>
              </div>
            )}

              <p className="mt-2 text-center text-[11px] leading-snug text-gray-500 dark:text-gray-400">
                Celestial AI provides general information about Celestial Web Solutions and web development. Prices are estimates in GH₵; confirm quotes with our team before paying.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  export async function getStaticProps() {
    // Evaluated at build time on the server; the language selector only makes
    // sense when a live model is configured, since the built-in knowledge engine
    // answers in English.
    const { hasLiveProvider } = await import('../lib/celestialAI/provider');
    return { props: { liveModel: hasLiveProvider() } };
  }

function AssistantAvatar() {
  return (
    <span className="mt-1 inline-flex shrink-0">
      <CelestialAIMark size="sm" />
    </span>
  );
}
