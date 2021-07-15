import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json'
import translationFR from './locales/fr/translation.json'
import translationES from './locales/esp/translation.json'
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

const resources = {
    en : {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    },
    es: {
        translation: translationES
    }
}
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",

        interpolation: {
            escapeValue: false
        }
    });


export default i18n;
