import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Villa Susane',
  projectId: 'rghbiwhc',
  dataset: 'production',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: 'https://villasusaneresort.website'
    })
  ],
  schema: {
    types: schemaTypes
  }
})
