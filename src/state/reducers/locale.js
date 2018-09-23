import { renderToStaticMarkup } from 'react-dom/server';
import appTranslations from '../resources/translations_app.json';

/**
 * Initial state needed to provide base data structure
 */
const AVAILABLE_LANGUAGES_INITIAL_STATE = [
  { name: 'Nederlands', code: 'du' },
  { name: 'English', code: 'en' }
];

export const LOCALIZE_INITIAL_STATE = {
  languages: AVAILABLE_LANGUAGES_INITIAL_STATE,
  translation: appTranslations,
  options: { defaultLanguage: 'en', renderToStaticMarkup }
}
