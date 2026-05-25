import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'accentTitle', title: 'Accent Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({name: 'backgroundImage', title: 'Background Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'buttonText', title: 'Button Text', type: 'string'}),
    defineField({name: 'features', title: 'Feature Labels', type: 'array', of: [{type: 'string'}]}),
  ],
})
