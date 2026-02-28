import type { ObjectDefinition } from 'sanity';
import supportedLanguages from './supportedLanguages';

const localeBlockContent: ObjectDefinition = {
  name: 'localeBlockContent',
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
    type: 'blockContent',
    fieldset: lang.isDefault ? undefined : 'translations',
  })),
};

export default localeBlockContent;
