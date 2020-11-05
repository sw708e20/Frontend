import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import enMessages from './en'
import daMessages from './da'
import cookie from "react-cookies";

export function changeLang(lang: string) {
    i18n.changeLanguage(lang).then(() => {
        cookie.save('lang', lang, {path: '/'});
    })
}

export function getLang(): string {
    let lang = cookie.load('lang');

    if (lang === undefined) lang = 'en';

    return lang
}

i18n.use(initReactI18next).init({
    resources: {
        en: enMessages,
        da: daMessages
    },
    lng: getLang(),
    fallbackLng: 'en',
    whitelist: ['en', 'da'],
    interpolation: {
        escapeValue: false
    }
})

export default i18n;