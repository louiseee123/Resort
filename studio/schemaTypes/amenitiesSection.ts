import {defineField, defineType} from 'sanity'

export const amenitiesSection = defineType({
  name: 'amenitiesSection',
  title: 'Amenities Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
  ],
})
