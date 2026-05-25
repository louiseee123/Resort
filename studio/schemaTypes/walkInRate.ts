import {defineField, defineType} from 'sanity'

export const walkInRate = defineType({
  name: 'walkInRate',
  title: 'Walk-In Rate',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text'}),
    defineField({name: 'guests', title: 'Guest / Capacity Label', type: 'string'}),
    defineField({name: 'badge', title: 'Badge', type: 'string'}),
    defineField({
      name: 'priceRows',
      title: 'Price Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'price', title: 'Price', type: 'string'}),
            defineField({name: 'note', title: 'Note', type: 'string'}),
          ],
        },
      ],
    }),
  ],
})
