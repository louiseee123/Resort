import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'

const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://villasusaneresort.website'

export default defineConfig({
  name: 'default',
  title: 'Villa Susane',
  projectId: 'rghbiwhc',
  dataset: 'production',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl
    })
  ],
  schema: {
    types: schemaTypes
  }
})
