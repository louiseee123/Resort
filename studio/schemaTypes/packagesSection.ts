import {defineField, defineType} from 'sanity'

export const packagesSection = defineType({
  name: 'packagesSection',
  title: 'Packages Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
  ],
})
