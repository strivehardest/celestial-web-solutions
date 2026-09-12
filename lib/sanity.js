import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'vsyqqswx',
  dataset: 'production',
  apiVersion: '2026-05-25',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)

/**
 * Fetch with a hard timeout so Vercel serverless ISR cannot hang until the
 * platform kills the invocation (which surfaces as HTTP 500 / failed revalidate).
 */
export async function fetchSanity(query, params = {}, { timeoutMs = 8000 } = {}) {
  let timer
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Sanity fetch timed out after ${timeoutMs}ms`))
    }, timeoutMs)
  })

  try {
    return await Promise.race([client.fetch(query, params), timeout])
  } finally {
    clearTimeout(timer)
  }
}
