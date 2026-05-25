import {defineField, defineType} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({name: 'quote', title: 'Short Quote', type: 'string'}),
    defineField({name: 'detail', title: 'Detailed Text', type: 'text'}),
    defineField({name: 'context', title: 'Review Category', type: 'string'}),
    defineField({name: 'author', title: 'Reviewer Name', type: 'string'}),
    defineField({name: 'proofImage', title: 'Screenshot Proof', type: 'image', options: {hotspot: true}}),
  ],
})
