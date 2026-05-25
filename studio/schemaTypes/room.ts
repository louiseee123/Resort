import {defineField, defineType} from 'sanity'

export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Room Name', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'price', title: 'Nightly Rate', type: 'string'}),
    defineField({name: 'guests', title: 'Guests', type: 'string'}),
    defineField({name: 'badge', title: 'Badge', type: 'string'}),
    defineField({
      name: 'images',
      title: 'Carousel Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
            defineField({name: 'label', title: 'Image Label', type: 'string'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'inclusions',
      title: 'Inclusions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
          ],
        },
      ],
    }),
  ],
})
