export interface SupportedLanguage {
  id: string;
  title: string;
  isDefault?: boolean;
}

const supportedLanguages: SupportedLanguage[] = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Spanish' },
  { id: 'nb', title: 'Norwegian' },
];

export default supportedLanguages;
