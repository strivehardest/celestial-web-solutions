import React from 'react'
import { urlFor } from './sanity'

function headingId(value) {
  return `heading-${value?._key || 'section'}`
}

export const portableTextComponents = {
  types: {
    // Keep code blocks dependency-free on the server. react-syntax-highlighter
    // pulls hundreds of files into the /blog/[slug] serverless trace and breaks
    // Vercel on-demand ISR / revalidation while next start still works.
    code: ({ value }) => {
      const language = value?.language || 'text'
      return (
        <div className="my-6 max-w-full overflow-hidden">
          {value?.filename && (
            <div className="bg-gray-900 text-gray-100 px-4 py-2 rounded-t-md text-sm font-medium overflow-hidden whitespace-nowrap text-ellipsis">
              {value.filename}
            </div>
          )}

          <pre
            className={`overflow-auto max-w-full rounded-b-md shadow-sm bg-gray-900 text-gray-100 p-4 text-sm leading-relaxed ${
              value?.filename ? '' : 'rounded-md'
            }`}
          >
            <code className={`language-${language} font-mono whitespace-pre`}>
              {value?.code || ''}
            </code>
          </pre>
        </div>
      )
    },

    image: ({ value }) => {
      if (!value?.asset) return null
      let src = ''
      try {
        src = urlFor(value).width(900).url()
      } catch {
        return null
      }
      return (
        <div className="my-8">
          <img
            src={src}
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
        <div className={`border-l-4 p-4 my-6 rounded-r-xl ${styles[value?.type] || styles.info}`}>
          <p className="text-base leading-relaxed">{value?.text}</p>
        </div>
      )
    },
  },

  marks: {
    link: ({ children, value }) => {
      let href = value?.href || '#'
      if (href && !/^(https?:|mailto:|tel:|\/|#)/i.test(href)) {
        href = `https://${href}`
      }
      const target = value?.blank ? '_blank' : '_self'
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      return (
        <a href={href} target={target} rel={rel}
          className="text-orange-600 hover:text-orange-700 hover:underline font-semibold transition-colors">
          {children}
        </a>
      )
    },
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-orange-600 dark:text-orange-400">
        {children}
      </code>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
    ),
  },

  block: {
    h2: ({ children, value }) => (
      <h2 id={headingId(value)}
        className="text-3xl font-bold text-gray-900 dark:text-white mt-10 mb-4 scroll-mt-24"
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3 id={headingId(value)}
        className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-24"
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
        {children}
      </h3>
    ),
    h4: ({ children, value }) => (
      <h4 id={headingId(value)}
        className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-2 scroll-mt-24"
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}>
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-500 pl-6 py-2 my-6 italic text-gray-700 dark:text-gray-300 bg-orange-50 dark:bg-orange-900/10 rounded-r-xl">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4"
        style={{ fontFamily: 'Albert Sans, sans-serif' }}>
        {children}
      </p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2 my-4 text-gray-800 dark:text-gray-200">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 my-4 text-gray-800 dark:text-gray-200">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-lg leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-lg leading-relaxed" style={{ fontFamily: 'Albert Sans, sans-serif' }}>{children}</li>
    ),
  },
}

export default portableTextComponents
