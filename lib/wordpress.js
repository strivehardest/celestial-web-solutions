// ===================================
// lib/wordpress.js - UPDATED API FUNCTIONS
// ===================================

const API_URL = process.env.WORDPRESS_API_URL || 'https://www.celestialwebsolutions.net/wp-json/wp/v2'

// ===== PORTFOLIO FUNCTIONS =====
export async function getPortfolioProjects(per_page = 12, category = null) {
  try {
    let url = `${API_URL}/portfolio?per_page=${per_page}&_embed`
    if (category) {
      url += `&portfolio_category=${category}`
    }
    
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const projects = await response.json()
    return projects
  } catch (error) {
    console.error('Error fetching portfolio projects:', error)
    return []
  }
}

export async function getPortfolioProjectBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/portfolio?slug=${slug}&_embed`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const projects = await response.json()
    return projects[0] || null
  } catch (error) {
    console.error(`Error fetching portfolio project "${slug}":`, error)
    return null
  }
}

// ===== SERVICES FUNCTIONS =====
export async function getServices() {
  try {
    const response = await fetch(`${API_URL}/services?_embed`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const services = await response.json()
    return services
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getServiceBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/services?slug=${slug}&_embed`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const services = await response.json()
    return services[0] || null
  } catch (error) {
    console.error(`Error fetching service "${slug}":`, error)
    return null
  }
}

// ===== BLOG FUNCTIONS =====
export async function getPosts(per_page = 10, page = 1) {
  try {
    const response = await fetch(`${API_URL}/posts?per_page=${per_page}&page=${page}&_embed`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const posts = await response.json()
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const posts = await response.json()
    return posts[0] || null
  } catch (error) {
    console.error(`Error fetching post "${slug}":`, error)
    return null
  }
}

// ===== TESTIMONIALS FUNCTIONS =====
export async function getTestimonials() {
  try {
    const response = await fetch(`${API_URL}/testimonials?_embed`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const testimonials = await response.json()
    return testimonials
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

// ===== PAGES FUNCTIONS =====
export async function getPageBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/pages?slug=${slug}&_embed`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const pages = await response.json()
    return pages[0] || null
  } catch (error) {
    console.error(`Error fetching page "${slug}":`, error)
    return null
  }
}

// ===== HELPER FUNCTIONS =====
export function getFeaturedImage(item) {
  if (item._embedded && item._embedded['wp:featuredmedia']) {
    return item._embedded['wp:featuredmedia'][0].source_url
  }
  return null
}

export function getExcerpt(item, length = 150) {
  if (!item.excerpt || !item.excerpt.rendered) return ''
  
  const excerpt = item.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
  return excerpt.length > length ? excerpt.substring(0, length) + '...' : excerpt
}

export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export function getProjectDetails(project) {
  return {
    projectUrl: project.meta?._project_url?.[0] || null,
    githubUrl: project.meta?._github_url?.[0] || null,
    techStack: project.meta?._tech_stack?.[0] || null,
    clientName: project.meta?._client_name?.[0] || null,
  }
}
