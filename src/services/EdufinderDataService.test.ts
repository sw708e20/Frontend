import MockAdapter from "axios-mock-adapter";
import axios from "./http-common";
import {Answer, Answer_Enum, Education, EducationType, Question} from "./QuestionManager";
import EdufinderDataService from "./EdufinderDataService";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {ServerResponse} from "http";

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

test('get first question', async () => {
    mock.onGet('/question/').reply(200, questions[0])

    let q: Question = new Question(-5, '', '');

    EdufinderDataService.getFirstQuestion().then((res) => {
        q = res
    });

    await runAllPromises();

    expect(q.id).toBe(-1);
    expect(q.en).toBe('Did Bush do 9/11?')
    expect(q.da).toBe('Gjorde busk 11/9?')
})

test('get next question', async () => {
    mock.onPost('/question/').reply(200, questions[1])

    let q: Question = new Question(-5, '', '');

    EdufinderDataService.getNextQuestion([]).then((res) => {
        q = res
    });

    await runAllPromises();

    expect(q.id).toBe(-2);
    expect(q.en).toBe('Have you had your morning covfefe?')
    expect(q.da).toBe('Har du haft din morgencovfefe?')
})

test('get recommendations', async () => {
    mock.onPost('/recommend/').reply(200, educations)

    let e: Education[] = []

    EdufinderDataService.getRecommendations([]).then((res) => {
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

test('post guess data', async () => {
    mock.onPost('/guess/').reply(200);

    EdufinderDataService.postGuessData(guess).then((res) => {
        expect(res.status).toBe(200);
    })

    await runAllPromises();
})

test('get educations', async () => {
    mock.onGet('/educations/').reply(200, educations);

    let e: Education[] = []

    EdufinderDataService.getEducations('').then((res) => {
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