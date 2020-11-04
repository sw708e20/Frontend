import i18n from 'i18next';
import {initReactI18next} from "react-i18next";

const resources = {
    en: {
        translation: {
            index: {
                title: "EduFinder",
                rec_btn: "Education recommender",
                guess_btn: "Guessing game"
            },

            recommender: {
                answer_opts: {
                    yes: 'Yes',
                    probably: 'Probably',
                    dont_know: 'Don\'t know',
                    probably_not: 'Probably not',
                    no: 'No'
                }
            },

            result: {
                rec_title: 'Recommended education',
                rem_title: 'You may also be interested in'
            },

            guess: {
                guess_title: 'We think your education is...',
                is_correct_title: 'Is this correct?',
                feedback_title: 'Please enter your actual education',
                yes_btn: 'Yes',
                no_btn: 'No',
                search: 'Search',
                search_error: 'Unfortunately we did not find any results with your query'
            }
        }
    },
    dk: {
        translation: {
            index: {
                title: "EduFinder",
                rec_btn: "Uddannelsesforslag",
                guess_btn: "Uddannelsesgætter"
            },
            recommender: {
                answer_opts: {
                    yes: 'Ja',
                    probably: 'Måske',
                    dont_know: 'Ved ikke',
                    probably_not: 'Måske ikke',
                    no: 'Nej'
                }
            },

            result: {
                rec_title: 'Anbefalet uddannelse',
                rem_title: 'Du vil måske også være interesseret i'
            },

            guess: {
                guess_title: 'Vi tror din uddannelse er...',
                is_correct_title: 'Er dette korrekt?',
                feedback_title: 'Angiv venligst din egentlige uddannelse',
                yes_btn: 'Ja',
                no_btn: 'Nej',
                search: 'Søg',
                search_error: 'Vi fandt desværre ikke nogen resultater'
            }
        }
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'da'],
    interpolation: {
        escapeValue: false
    }
})

export default i18n;