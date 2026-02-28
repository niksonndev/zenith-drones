import { RiMacbookLine } from 'react-icons/ri';
import type { DocumentDefinition } from 'sanity';

const product: DocumentDefinition = {
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: RiMacbookLine,
  fieldsets: [
    {
      name: 'technicalSpecs',
      title: 'Technical Specs',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'batteryLife',
      title: 'Battery Life',
      type: 'number',
      fieldset: 'technicalSpecs',
      description: 'Duração da bateria em minutos',
    },
    {
      name: 'maxSpeed',
      title: 'Max Speed',
      type: 'number',
      fieldset: 'technicalSpecs',
      description: 'Velocidade máxima em km/h',
    },
    {
      name: 'cameraResolution',
      title: 'Camera Resolution',
      type: 'string',
      fieldset: 'technicalSpecs',
      description: 'Ex: 4K, 12MP, 48MP',
    },
    {
      name: 'weight',
      title: 'Weight',
      type: 'number',
      fieldset: 'technicalSpecs',
      description: 'Peso em gramas',
    },
  ],
};

export default product;
