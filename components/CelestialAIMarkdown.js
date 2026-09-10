import Link from 'next/link';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';

const SITE_HOSTS = ['celestialwebsolutions.net', 'www.celestialwebsolutions.net'];

const CTA_RE = /\[\[cta:([^\]|]+)\|([^\]|]+)(?:\|([^\]]+))?\]\]/g;

function normalizeHref(href) {
  let internal = href.startsWith('/') || href.startsWith('tel:') || href.startsWith('mailto:');
  let next = href;
  if (!internal && href.startsWith('http')) {
    try {
      const url = new URL(href);
      if (SITE_HOSTS.includes(url.hostname)) {
        internal = true;
        next = `${url.pathname}${url.search}${url.hash}` || '/';
      }
    } catch (_) {
      internal = false;
    }
  }
  return { href: next, internal };
}

function renderLink(href, label, key) {
  const className =
    'font-medium text-orange-600 underline decoration-orange-300 underline-offset-2 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300';
  const { href: next, internal } = normalizeHref(href);
  if (internal && next.startsWith('/')) {
    return (
      <Link key={key} href={next} className={className}>
        {label}
      </Link>
    );
  }
  const external = next.startsWith('http');
  return (
    <a
      key={key}
      href={next}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  );
}

function CtaButton({ href, label, variant = 'primary', keyName }) {
  const { href: next, internal } = normalizeHref(href);
  const lower = `${label} ${next}`.toLowerCase();
  const Icon =
    /whatsapp|wa\.me/.test(lower) ? MessageCircle : /tel:|call/.test(lower) ? Phone : ArrowRight;

  const base =
    'inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40';
  const styles =
    variant === 'secondary'
      ? 'border border-orange-300 bg-white text-orange-700 hover:bg-orange-50 dark:border-orange-400/40 dark:bg-transparent dark:text-orange-300 dark:hover:bg-orange-500/10'
      : 'bg-orange-500 text-white shadow-sm shadow-orange-500/25 hover:bg-orange-600';

  const className = `${base} ${styles}`;
  const content = (
    <>
      <span>{label}</span>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </>
  );

  if (internal && next.startsWith('/')) {
    return (
      <Link key={keyName} href={next} className={className}>
        {content}
      </Link>
    );
  }

  const external = next.startsWith('http');
  return (
    <a
      key={keyName}
      href={next}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}

function renderInline(text, keyPrefix) {
  const nodes = [];
  // CTAs are handled at block level; strip any inline leftovers as buttons.
  const pattern =
    /(\[\[cta:[^\]|]+\|[^\]]+\]\]|\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|\/|tel:|mailto:)[^)\s]+\)|https?:\/\/[^\s)]+|_[^_]+_)/g;
  let last = 0;
  let match;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${i++}`;

    if (token.startsWith('[[cta:')) {
      CTA_RE.lastIndex = 0;
      const cta = CTA_RE.exec(token);
      if (cta) {
        nodes.push(
          <span key={key} className="mx-0.5 inline-flex align-middle">
            <CtaButton href={cta[2].trim()} label={cta[1].trim()} variant={(cta[3] || 'primary').trim()} keyName={`${key}-btn`} />
          </span>
        );
      }
    } else if (token.startsWith('**')) {
      nodes.push(
        <strong key={key} className="font-semibold text-gray-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('[')) {
      const close = token.indexOf('](');
      const label = token.slice(1, close);
      const href = token.slice(close + 2, -1);
      nodes.push(renderLink(href, label, key));
    } else if (token.startsWith('http')) {
      nodes.push(renderLink(token, token.replace(/^https?:\/\//, ''), key));
    } else {
      nodes.push(
        <em key={key} className="text-gray-500 dark:text-gray-400">
          {token.slice(1, -1)}
        </em>
      );
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function extractCtas(line) {
  const ctas = [];
  let rest = line;
  CTA_RE.lastIndex = 0;
  let match;
  const re = /\[\[cta:([^\]|]+)\|([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  while ((match = re.exec(line)) !== null) {
    ctas.push({ label: match[1].trim(), href: match[2].trim(), variant: (match[3] || 'primary').trim() });
  }
  if (ctas.length) {
    rest = line.replace(/\[\[cta:[^\]]+\]\]/g, '').replace(/\s{2,}/g, ' ').trim();
  }
  return { ctas, rest };
}

export default function CelestialAIMarkdown({ text }) {
  const lines = (text || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let list = null;
  let paragraph = [];
  let ctaBuffer = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: 'p', text: paragraph.join(' ') });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };
  const flushCtas = () => {
    if (ctaBuffer.length) {
      blocks.push({ type: 'ctas', items: ctaBuffer });
      ctaBuffer = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushCtas();
      continue;
    }
    if (/^-{3,}$/.test(trimmed)) {
      flushParagraph();
      flushList();
      flushCtas();
      blocks.push({ type: 'hr' });
      continue;
    }

    const { ctas, rest } = extractCtas(trimmed);
    if (ctas.length && !rest) {
      flushParagraph();
      flushList();
      ctaBuffer.push(...ctas);
      continue;
    }
    if (ctas.length && rest) {
      flushCtas();
    }

    const heading = (rest || trimmed).match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushCtas();
      blocks.push({ type: 'h', text: heading[2] });
      if (ctas.length) ctaBuffer.push(...ctas);
      continue;
    }
    const bullet = (rest || trimmed).match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      flushCtas();
      const ordered = /^\d/.test(rest || trimmed);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { type: 'list', ordered, items: [] };
      }
      list.items.push(bullet[1]);
      if (ctas.length) {
        flushList();
        ctaBuffer.push(...ctas);
      }
      continue;
    }
    flushList();
    flushCtas();
    paragraph.push(rest || trimmed);
    if (ctas.length) {
      flushParagraph();
      ctaBuffer.push(...ctas);
    }
  }
  flushParagraph();
  flushList();
  flushCtas();

  return (
    <div className="space-y-2.5 text-[15px] leading-relaxed">
      {blocks.map((block, index) => {
        const key = `b${index}`;
        if (block.type === 'hr') {
          return <hr key={key} className="border-gray-200 dark:border-white/10" />;
        }
        if (block.type === 'ctas') {
          return (
            <div key={key} className="flex flex-wrap gap-2 pt-1">
              {block.items.map((item, i) => (
                <CtaButton
                  key={`${key}-${i}`}
                  href={item.href}
                  label={item.label}
                  variant={item.variant}
                  keyName={`${key}-${i}`}
                />
              ))}
            </div>
          );
        }
        if (block.type === 'h') {
          return (
            <p key={key} className="pt-1 font-semibold text-gray-900 dark:text-white">
              {renderInline(block.text, key)}
            </p>
          );
        }
        if (block.type === 'list') {
          const Tag = block.ordered ? 'ol' : 'ul';
          return (
            <Tag
              key={key}
              className={`${block.ordered ? 'list-decimal' : 'list-disc'} space-y-1 pl-5 marker:text-orange-500`}
            >
              {block.items.map((item, i) => (
                <li key={`${key}-${i}`}>{renderInline(item, `${key}-${i}`)}</li>
              ))}
            </Tag>
          );
        }
        return <p key={key}>{renderInline(block.text, key)}</p>;
      })}
    </div>
  );
}
