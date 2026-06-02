export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',

  fieldsets: [
    { name: 'content', title: 'Content', options: { collapsible: false } },
    { name: 'media', title: 'Media', options: { collapsible: false } },
    { name: 'seo', title: 'SEO & Settings', options: { collapsible: false } },
  ],

  fields: [
    // ── CONTENT TAB ──────────────────────────────────────
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      fieldset: 'content',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      fieldset: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: Rule => Rule.uri({
                      allowRelative: true,
                      scheme: ['https', 'http', 'mailto', 'tel']
                    })
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        },
        {
          type: 'code',
          title: 'Code Block',
          options: {
            languageAlternatives: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
              { title: 'Plain Text', value: 'text' },
            ],
          },
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            { name: 'text', type: 'text', title: 'Text' },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'Info', value: 'info' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Tip', value: 'tip' },
                ]
              }
            }
          ],
          preview: { select: { title: 'text' } }
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      fieldset: 'content',
      initialValue: 'Celestial Team',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      fieldset: 'content',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'content',
      options: {
        list: [
          { title: 'Web Design', value: 'Web Design' },
          { title: 'Web Development', value: 'Web Development' },
          { title: 'SEO', value: 'SEO' },
          { title: 'E-Commerce', value: 'E-Commerce' },
          { title: 'Digital Marketing', value: 'Digital Marketing' },
          { title: 'AI & Technology', value: 'AI & Technology' },
          { title: 'Business', value: 'Business' },
          { title: 'Security', value: 'Security' },
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      fieldset: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }
    },
    {
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      fieldset: 'content',
      initialValue: false,
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      fieldset: 'content',
      description: 'e.g. 5 min read',
    },

    // ── MEDIA TAB ─────────────────────────────────────────
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: Rule => Rule.required().warning('Alt text is important for SEO and accessibility')
        }
      ]
    },
    {
      name: 'ogImage',
      title: 'Social Share Image (OG Image)',
      type: 'image',
      fieldset: 'media',
      description: 'Image shown when shared on social media. Recommended: 1200x630px',
      options: { hotspot: true },
    },

    // ── SEO & SETTINGS TAB ────────────────────────────────
    {
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'seo',
      rows: 3,
      description: 'Max 160 characters. Shown in search engine results.',
      validation: Rule => Rule.max(160)
    },
    {
      name: 'seoKeywords',
      title: 'SEO Keywords',
      type: 'string',
      fieldset: 'seo',
      description: 'Comma-separated keywords e.g. web design, Ghana, SEO'
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      fieldset: 'seo',
      description: 'Only set if this post is republished from another URL',
    },
    {
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      fieldset: 'seo',
      initialValue: false,
      description: 'Enable to add noindex meta tag to this post',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'category',
    },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle }
    }
  },

  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Published Date, Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
    },
  ]
}