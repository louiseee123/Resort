import {defineField, defineType} from 'sanity'

export const contactSection = defineType({
  name: 'contactSection',
  title: 'Contact / Package Inquiry Section',
  type: 'document',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text'}),
    defineField({name: 'formIntro', title: 'Form Intro Text', type: 'text'}),
    defineField({name: 'directPhone', title: 'Direct Phone', type: 'string'}),
    defineField({name: 'directEmail', title: 'Direct Email', type: 'string'}),
    defineField({name: 'facebookPage', title: 'Facebook Page', type: 'string'}),
  ],
})
