import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en.json';
import ua from './ua.json';

// Дістаємо поточну локаль
const deviceLocale = Localization.locale ? Localization.locale.toLowerCase() : 'en';

// Вибір мови
let lng = 'en';
if (deviceLocale.startsWith('uk') || deviceLocale.startsWith('ua')) {
    lng = 'ua';
}

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        lng,
        fallbackLng: 'en',
        resources: {
            en: { translation: en },
            ua: { translation: ua }
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
