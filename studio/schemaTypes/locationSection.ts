import {defineField, defineType} from 'sanity'

export const locationSection = defineType({
  name: 'locationSection',
  title: 'Location Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({name: 'resortName', title: 'Resort Name', type: 'string'}),
    defineField({name: 'address', title: 'Address', type: 'text'}),
    defineField({name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url'}),
    defineField({name: 'phone', title: 'Phone', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'highlights', title: 'Property Access Highlights', type: 'array', of: [{type: 'string'}]}),
  ],
})
