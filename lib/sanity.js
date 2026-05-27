import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'vsyqqswx',
  dataset: 'production',
  apiVersion: '2026-05-25',
  useCdn: true,
})

// For image URL generation
const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)