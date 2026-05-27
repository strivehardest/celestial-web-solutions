import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { definePlugin } from 'sanity'
import post from './sanity/schemas/post'
import CelestialLogo from './sanity/components/CelestialLogo'

export default defineConfig({
  name: 'celestial',
  title: 'Celestial Web Solutions — Studio',
  projectId: 'vsyqqswx',
  dataset: 'production',
  basePath: '/studio',

  studio: {
    components: {
      logo: CelestialLogo,
    }
  },

  plugins: [
    structureTool({
      title: 'Content',
      structure: (S) =>
        S.list()
          .title('Celestial Web Solutions')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(
                S.document()
                  .schemaType('post')
                  .views([
                    S.view.form().title('All fields'),
                    S.view.form().title('Content').id('content'),
                    S.view.form().title('Media').id('media'),
                    S.view.form().title('SEO & Settings').id('seo'),
                  ])
                  
              )
              .child(
                S.documentList()
                  .title('All Posts')
                  .filter('_type == "post"')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
              ),
            S.listItem()
              .title('Featured Posts')
              .child(
                S.documentList()
                  .title('Featured')
                  .filter('_type == "post" && featured == true')
              ),
          ])
    }),
  ],

  schema: {
    types: [post],
  },
})