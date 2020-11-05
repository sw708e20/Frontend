import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import enMessages from './en'
import daMessages from './da'
import cookie from "react-cookies";

// you did not see this spaghet, carry on
let recChangeHandler: (lang: string) => void = (lang: string) => {};

export function setRecChangeHandler(f: (lang: string) => void) {
    recChangeHandler = f;
}

export function changeLang(lang: string, updateLang: (lang: string) => void) {
    i18n.changeLanguage(lang).then(() => {
        cookie.save('lang', lang, {path: '/'});
        updateLang(lang)
        recChangeHandler(lang)
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
