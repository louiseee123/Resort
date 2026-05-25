import {defineField, defineType} from 'sanity'

export const ratesSection = defineType({
  name: 'ratesSection',
  title: 'Rates Section',
  type: 'document',
  fields: [
    defineField({name: 'walkInEyebrow', title: 'Walk-In Eyebrow', type: 'string'}),
    defineField({name: 'walkInTitle', title: 'Walk-In Title', type: 'string'}),
    defineField({name: 'walkInSubtitle', title: 'Walk-In Subtitle', type: 'text'}),
    defineField({name: 'roomsEyebrow', title: 'Rooms Eyebrow', type: 'string'}),
    defineField({name: 'roomsTitle', title: 'Rooms Title', type: 'string'}),
  ],
})
