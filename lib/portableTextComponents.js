import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export const portableTextComponents = {
  types: {
    code: ({ value }) => {
      const language = value?.language || 'text'
      return (
        <div className="my-6">
          {value?.filename && (
            <div className="bg-gray-900 text-gray-100 px-4 py-2 rounded-t-md text-sm font-medium">
              {value.filename}
            </div>
          )}
          <SyntaxHighlighter
            language={language}
            style={atomOneDark}
            showLineNumbers
            wrapLongLines
            customStyle={{ margin: 0, padding: '1rem', borderRadius: '0 0 0.375rem 0.375rem' }}
          >
            {value?.code || ''}
          </SyntaxHighlighter>
        </div>
      )
    },

    image: ({ value }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-6">
          <img
            src={value.asset.url}
            alt={value.alt || value.caption || 'Image'}
            className="w-full rounded"
          />
          {value.caption && (
            <figcaption className="text-sm text-gray-600 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },

  block: {
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>,
    normal: ({ children }) => <p className="my-4 leading-7 text-gray-800 dark:text-gray-200">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:text-gray-300 my-4">{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded font-mono text-sm">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = value?.href || ''
      const target = href && href.startsWith('http') ? '_blank' : '_self'
      return (
        <a
          href={href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-orange-500 hover:text-orange-600 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      )
    },
  },
}

export default portableTextComponents
import { urlFor } from './sanity'

export const portableTextComponents = {
  types: {
    image: function({ value }) {
      if (!value || !value.asset) return null
      return (
        <div className="my-8">
          <img
            src={urlFor(value).width(900).url()}
            alt={value.alt || ''}
            className="w-full rounded-xl shadow-md"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-500 mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      )
    },

    callout: ({ value }) => {
      const styles = {
        info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 text-blue-800 dark:text-blue-200',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 text-yellow-800 dark:text-yellow-200',
        tip: 'bg-orange-50 dark:bg-orange-900/20 border-orange-400 text-orange-800 dark:text-orange-200',
      }
      return (
        <div className={`border-l-4 p-4 my-6 rounded-r-xl ${styles[value.type] || styles.info}`}>
          <p className="text-base leading-relaxed">{value.text}</p>
        </div>
      )
    },
  },

  marks: {
    link: function({ children, value }) {
      const href = value && value.href ? value.href : '#'
      const target = value && value.blank ? '_blank' : '_self'
      const rel = value && value.blank ? 'noopener noreferrer' : undefined
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          className="text-orange-600 hover:text-orange-700 hover:underline font-semibold transition-colors"
        >
          {children}
        </a>
      )
    },
    code: function({ children }) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-orange-600 dark:text-orange-400">
          {children}
        </code>
      )
    },
    strong: function({ children }) {
      return (
        <strong className="font-bold text-gray-900 dark:text-white">
          {children}
        </strong>
      )
    },
    em: function({ children }) {
      return (
        <em className="italic text-gray-700 dark:text-gray-300">
          {children}
        </em>
      )
    },
  },

  block: {
    h2: function({ children, value }) {
      return (
        <h2
          id={"heading-" + value._key}
          className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-24"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          {children}
        </h2>
      )
    },
    h3: function({ children, value }) {
      return (
        <h3
          id={"heading-" + value._key}
          className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-24"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          {children}
        </h3>
      )
    },
    h4: function({ children, value }) {
      return (
        <h4
          id={"heading-" + value._key}
          className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2 scroll-mt-24"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
          {children}
        </h4>
      )
    },
    blockquote: function({ children }) {
      return (
        <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-6 italic text-gray-700 dark:text-gray-300 bg-orange-50 dark:bg-orange-900/10 rounded-r-xl">
          {children}
        </blockquote>
      )
    },
    normal: function({ children }) {
      return (
        <p
          className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4"
          style={{ fontFamily: 'Albert Sans, sans-serif' }}
        >
          {children}
        </p>
      )
    },
  },

  list: {
    bullet: function({ children }) {
      return (
        <ul className="list-disc pl-6 space-y-2 my-4 text-gray-800 dark:text-gray-200">
          {children}
        </ul>
      )
    },
    number: function({ children }) {
      return (
        <ol className="list-decimal pl-6 space-y-2 my-4 text-gray-800 dark:text-gray-200">
          {children}
        </ol>
      )
    },
  },

  listItem: {
    bullet: function({ children }) {
      return (
        <li
          className="text-lg leading-relaxed"
          style={{ fontFamily: 'Albert Sans, sans-serif' }}
        >
          {children}
        </li>
      )
    },
    number: function({ children }) {
      return (
        <li
          className="text-lg leading-relaxed"
          style={{ fontFamily: 'Albert Sans, sans-serif' }}
        >
          {children}
        </li>
      )
    },
  },
}