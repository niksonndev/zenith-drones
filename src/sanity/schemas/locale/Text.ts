import type { ObjectDefinition } from 'sanity';
import supportedLanguages from './supportedLanguages';

const localeText: ObjectDefinition = {
  name: 'localeText',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) => ({
    title: lang.title,
    name: lang.id,
    type: 'text',
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
};

export default localeText;
