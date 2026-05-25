import {defineField, defineType} from 'sanity'

export const reviewsSection = defineType({
  name: 'reviewsSection',
  title: 'Reviews Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({name: 'trustText', title: 'Trust Badge Text', type: 'string'}),
  ],
})
