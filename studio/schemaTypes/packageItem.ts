import {defineField, defineType} from 'sanity'

export const packageItem = defineType({
  name: 'packageItem',
  title: 'Package',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Package Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'price', title: 'Price', type: 'string'}),
    defineField({name: 'pax', title: 'Pax / Capacity', type: 'string'}),
    defineField({name: 'badge', title: 'Badge', type: 'string'}),
    defineField({name: 'images', title: 'Images', type: 'array', of: [{type: 'image', options: {hotspot: true}}]}),
    defineField({name: 'includes', title: 'Includes', type: 'array', of: [{type: 'string'}]}),
  ],
})
