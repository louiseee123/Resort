import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { defineDocuments, presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://villasusaneresort.website'
const mainDocuments = defineDocuments([
  {
    route: '/',
    filter: `_type in [
      "siteSettings",
      "heroSection",
      "amenitiesSection",
      "amenity",
      "ratesSection",
      "walkInRate",
      "room",
      "locationSection",
      "packagesSection",
      "packageItem",
      "reviewsSection",
      "review",
      "contactSection"
    ]`,
  },
])

export default defineConfig({
  name: 'default',
  title: 'Villa Susane',
  projectId: 'rghbiwhc',
  dataset: 'production',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        initial: previewUrl,
      },
      allowOrigins: [
        'http://localhost:*',
        'https://villasusaneresort.website',
        'https://*.vercel.app',
      ],
      resolve: {
        mainDocuments,
      },
    })
  ],
  schema: {
    types: schemaTypes
  }
})
