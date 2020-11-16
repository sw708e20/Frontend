import {Answer_Enum, Education, EducationType, getAnswerString, Question, Answer, questionManager} from "./QuestionManager";
import MockAdapter from "axios-mock-adapter";
import axios from "./http-common";

const educations: Education[] = [
    {
        id: -1,
        description: 'meget spændende uddannelse',
        name: 'Anvendt filosofi',
        education_types: []
    },
    {
        id: -2,
        description: 'knapt så spændende uddannelse',
        name: 'Software',
        education_types: [
            new EducationType('masters', 'https://yeet.dk', -1)
        ]
    }
];

const questions: Question[] = [
    {
        id: -1,
        en: 'Did Bush do 9/11?',
        da: 'Gjorde busk 11/9?'
    },
    {
        id: -2,
        en: 'Have you had your morning covfefe?',
        da: 'Har du haft din morgencovfefe?'
    }
]

const answers: Answer[] = [
    {
        question: questions[0],
        value: Answer_Enum.YES
    },
    {
        question: questions[1],
        value: Answer_Enum.NO
    }
]

const guess: {questions: Answer[], education: number} = {
    questions: answers,
    education: educations[0].id
}

let mock = new MockAdapter(axios);

const runAllPromises = () => new Promise(setImmediate)

beforeEach(() => {})

afterEach(() => {
    mock.reset();
})

test('education object', () => {
    const e = new Education(1, 'test', 'exciting education');

    expect(e.id).toBe(1);
    expect(e.name).toBe('test');
    expect(e.description).toBe('exciting education');
    expect(e.education_types).toStrictEqual([]);
})

test('education object with type', () => {
    const et = new EducationType('masters', 'real url', 1);
    const e = new Education(1, 'test', 'exciting education');
    e.education_types.push(et);

    expect(e.id).toBe(1);
    expect(e.name).toBe('test');
    expect(e.description).toBe('exciting education');
    expect(e.education_types.length).toBe(1);
    expect(e.education_types[0].name).toBe('masters');
    expect(e.education_types[0].url).toBe('real url');
    expect(e.education_types[0].id).toBe(1);
})

test('question object', () => {
    const q = new Question(1, 'Is cheese just a loaf of milk?', 'Er ost bare mælkebrød?');

    expect(q.id).toBe(1);
    expect(q.en).toBe('Is cheese just a loaf of milk?');
    expect(q.da).toBe('Er ost bare mælkebrød?');
})

test('answer object', () => {
    const a = new Answer(
        new Question(
            1,
            'Is Hans a professor?',
            'Er Hans professor?'),
        -2
    )

    expect(a.value).toBe(-2);
    expect(a.question.id).toBe(1);
    expect(a.question.en).toBe('Is Hans a professor?');
    expect(a.question.da).toBe('Er Hans professor?');
})

test('answer enum', () => {
    expect(Answer_Enum.YES).toBe(2);
    expect(Answer_Enum.PROBABLY).toBe(1);
    expect(Answer_Enum.DONT_KNOW).toBe(0);
    expect(Answer_Enum.PROBABLY_NOT).toBe(-1);
    expect(Answer_Enum.NO).toBe(-2);
})

test('get answer string from answer enum (yes)', () => {
    const str = getAnswerString(Answer_Enum.YES);
    expect(str).toBe('recommender.answer_opts.yes');
})

test('get answer string from answer enum (probably)', () => {
    const str = getAnswerString(Answer_Enum.PROBABLY);
    expect(str).toBe('recommender.answer_opts.probably');
})

test('get answer string from answer enum (dont know)', () => {
    const str = getAnswerString(Answer_Enum.DONT_KNOW);
    expect(str).toBe('recommender.answer_opts.dont_know');
})

test('get answer string from answer enum (probably not)', () => {
    const str = getAnswerString(Answer_Enum.PROBABLY_NOT);
    expect(str).toBe('recommender.answer_opts.probably_not');
})

test('get answer string from answer enum (no)', () => {
    const str = getAnswerString(Answer_Enum.NO);
    expect(str).toBe('recommender.answer_opts.no');
})

test('question manager converted array', () => {
    const ca = questionManager.getConvertedArray(answers);

    expect(ca[0].answer).toBe(2);
    expect(ca[0].id).toBe(-1);
    expect(ca[1].answer).toBe(-2);
    expect(ca[1].id).toBe(-2);
})

test('question manager get first question', async () => {
    mock.onGet('/question/').reply(200, questions[0])

    let q: Question = new Question(-5, '', '');

    questionManager.getFirstQuestion().then((res) => {
        q = res
    });

    await runAllPromises();

    expect(q.id).toBe(-1);
    expect(q.en).toBe('Did Bush do 9/11?')
    expect(q.da).toBe('Gjorde busk 11/9?')
})

test(' question manager get next question', async () => {
    mock.onPost('/question/').reply(200, questions[1])

    let q: Question = new Question(-5, '', '');

    questionManager.getNextQuestion([]).then((res) => {
        q = res
    });

    await runAllPromises();

    expect(q.id).toBe(-2);
    expect(q.en).toBe('Have you had your morning covfefe?')
    expect(q.da).toBe('Har du haft din morgencovfefe?')
})

test('question manager get recommendations', async () => {
    mock.onPost('/recommend/').reply(200, educations)

    let e: Education[] = []

    questionManager.getRecommendations([]).then((res) => {
        e = res
    })

    await runAllPromises();

    expect(e.length).toBe(2);

    expect(e[0].id).toBe(-1);
    expect(e[0].description).toBe('meget spændende uddannelse');
    expect(e[0].name).toBe('Anvendt filosofi');
    expect(e[0].education_types.length).toBe(0);

    expect(e[1].id).toBe(-2);
    expect(e[1].description).toBe('knapt så spændende uddannelse');
    expect(e[1].name).toBe('Software');
    expect(e[1].education_types.length).toBe(1);
    expect(e[1].education_types[0].id).toBe(-1);
    expect(e[1].education_types[0].name).toBe('masters');
    expect(e[1].education_types[0].url).toBe('https://yeet.dk');
})

test('question manager send guess data', async () => {
    mock.onPost('/guess/').reply(200);

    questionManager.sendGuessData(guess.questions, educations[0]).then((res) => {
        expect(res.status).toBe(200);
    })

    await runAllPromises();
})

test('question manager get educations', async () => {
    mock.onGet('/educations/').reply(200, educations);

    let e: Education[] = []

    questionManager.getEducations('').then((res) => {
        e = res
    })

    await runAllPromises();

    expect(e.length).toBe(2);

    expect(e[0].id).toBe(-1);
    expect(e[0].description).toBe('meget spændende uddannelse');
    expect(e[0].name).toBe('Anvendt filosofi');
    expect(e[0].education_types.length).toBe(0);

    expect(e[1].id).toBe(-2);
    expect(e[1].description).toBe('knapt så spændende uddannelse');
    expect(e[1].name).toBe('Software');
    expect(e[1].education_types.length).toBe(1);
    expect(e[1].education_types[0].id).toBe(-1);
    expect(e[1].education_types[0].name).toBe('masters');
    expect(e[1].education_types[0].url).toBe('https://yeet.dk');
})