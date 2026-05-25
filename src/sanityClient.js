import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'rghbiwhc',
  dataset: 'production',
  apiVersion: '2026-05-24',
  useCdn: true,
})

export default client
