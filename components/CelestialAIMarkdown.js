import Link from 'next/link';

const SITE_HOSTS = ['celestialwebsolutions.net', 'www.celestialwebsolutions.net'];

function renderInline(text, keyPrefix) {
  const nodes = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:https?:\/\/|\/|tel:|mailto:)[^)\s]+\)|https?:\/\/[^\s)]+|_[^_]+_)/g;
  let last = 0;
  let match;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${i++}`;

    if (token.startsWith('**')) {
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

function renderLink(href, label, key) {
  const className = 'font-medium text-orange-600 underline decoration-orange-300 underline-offset-2 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300';
  let internal = href.startsWith('/');
  if (!internal && href.startsWith('http')) {
    try {
      const url = new URL(href);
      if (SITE_HOSTS.includes(url.hostname)) {
        internal = true;
        href = `${url.pathname}${url.search}${url.hash}` || '/';
      }
    } catch (_) {
      internal = false;
    }
  }
  if (internal) {
    return (
      <Link key={key} href={href} className={className}>
        {label}
      </Link>
    );
  }
  const external = href.startsWith('http');
  return (
    <a
      key={key}
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  );
}

export default function CelestialAIMarkdown({ text }) {
  const lines = (text || '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let list = null;
  let paragraph = [];

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

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    if (/^-{3,}$/.test(trimmed)) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'hr' });
      continue;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h', text: heading[2] });
      continue;
    }
    const bullet = trimmed.match(/^(?:[-*•]|\d+[.)])\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      const ordered = /^\d/.test(trimmed);
      if (!list || list.ordered !== ordered) {
        flushList();
        list = { type: 'list', ordered, items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();

  return (
    <div className="space-y-2.5 text-[15px] leading-relaxed">
      {blocks.map((block, index) => {
        const key = `b${index}`;
        if (block.type === 'hr') {
          return <hr key={key} className="border-gray-200 dark:border-white/10" />;
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
