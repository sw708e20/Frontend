import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import enMessages from './en'
import daMessages from './da'

i18n.use(initReactI18next).init({
    resources: {
        en: enMessages,
        da: daMessages
    },
    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'da'],
    interpolation: {
        escapeValue: false
    }
})


export default i18n;