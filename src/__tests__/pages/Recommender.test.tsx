import {createMemoryHistory} from "history";
import '../../i18n/i18n';
import {changeLang} from '../../i18n/i18n'
import {act} from "react-dom/test-utils";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import Recommender from "../../pages/Recommender";
import MockAdapter from "axios-mock-adapter"
import React from "react";
import axios from "../../services/http-common"
import { Answer, Answer_Enum, Question } from "../../services/QuestionManager";
import each from "jest-each"


Enzyme.configure({adapter: new Adapter()});

let history = createMemoryHistory();
let mock = new MockAdapter(axios)

beforeEach(() => {
    let question = {
        id: 13,
        en: "Some initial question?",
        da: "Et udgangspunkt spørgsmål?"
    };
    mock.onGet("/question/").reply(200, question)
    history.push('/quiz/', {routeTo:"", state: {routeTo: "", answers: [], question: undefined}});
    changeLanguage('en');
})

afterEach(() => {
    mock.reset()
    history = createMemoryHistory();
})

const changeLanguage = (lang: string) => {
    act(() => {
        changeLang(lang)
    })
}

const renderRecommenderPage = () => {
    return render(<Router history={history}><Recommender /></Router>)
}

const mountRecommenderPage = () => {
    return mount(<Router history={history}><Recommender /></Router>)
}

const runAllPromises = () => new Promise(setImmediate)

test('quiz title', () => {
    const {getByText} = renderRecommenderPage();
    const title = getByText(/Q/i);
    expect(title).toBeInTheDocument();
    expect(title.nodeName).toBe('H1');
})

test('quiz answer yes EN', () => {
    const {getAllByText} = renderRecommenderPage();
    const obj = getAllByText(/Yes/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer yes DA', () => {
    const {getAllByText} = renderRecommenderPage();

    changeLanguage('da');

    const obj = getAllByText(/Ja/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer no EN', () => {
    const {getAllByText} = renderRecommenderPage();
    const obj = getAllByText(/No/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer no DA', () => {
    const {getAllByText} = renderRecommenderPage();

    changeLanguage('da');

    const obj = getAllByText(/Nej/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer probably EN', () => {
    const {getAllByText} = renderRecommenderPage();
    const obj = getAllByText(/Probably/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer probably DA', () => {
    const {getAllByText} = renderRecommenderPage();

    changeLanguage('da');

    const obj = getAllByText(/Måske/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer probably not EN', () => {
    const {getAllByText} = renderRecommenderPage();
    const obj = getAllByText(/Probably not/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer probably not DA', () => {
    const {getAllByText} = renderRecommenderPage();

    changeLanguage('da');

    const obj = getAllByText(/Måske ikke/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer dont know EN', () => {
    const {getAllByText} = renderRecommenderPage();
    const obj = getAllByText(/Don't know/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test('quiz answer dont know DA', () => {
    const {getAllByText} = renderRecommenderPage();

    changeLanguage('da');

    const obj = getAllByText(/Ved ikke/i);
    for (let o of obj) {
        expect(o).toBeInTheDocument();
    }
})

test("quiz initial guestion EN", async ()=>{
    const wrapper = mountRecommenderPage();

    await runAllPromises()
    wrapper.update()

    const title = wrapper.find(".title");   
    expect(title.get(0).props["children"]).toBe('Q1: Some initial question?');
})

test("quiz initial guestion DA", async ()=>{
    const wrapper = mountRecommenderPage();

    changeLanguage("da");

    await runAllPromises()
    wrapper.update()

    const title = wrapper.find(".title");   
    expect(title.get(0).props["children"]).toBe('Q1: Et udgangspunkt spørgsmål?');
})


each([Answer_Enum.YES, Answer_Enum.PROBABLY, Answer_Enum.DONT_KNOW, Answer_Enum.PROBABLY_NOT, Answer_Enum.NO].map((x) => Answer_Enum[x]))
    .test("Answer buttons DA %s", async (answer) =>{
        let secondQuestion = {
            id: 6,
            en: "second question?",
            da: "andet spørgsmål?"
        };
        mock.onPost("/question/").reply(200, secondQuestion)

        let wrapper = mountRecommenderPage()

        await runAllPromises()
        wrapper.update()

        changeLanguage("da")
        wrapper.find("#"+ answer.toLowerCase() +"_btn").simulate("click")

        await runAllPromises()
        wrapper.update()
        
        const title = wrapper.find(".title");   
        expect(title.get(0).props["children"]).toBe('Q2: andet spørgsmål?');
    })


each([Answer_Enum.YES, Answer_Enum.PROBABLY, Answer_Enum.DONT_KNOW, Answer_Enum.PROBABLY_NOT, Answer_Enum.NO].map((x) => Answer_Enum[x]))
    .test("Answer buttons EN %s", async (answer) =>{
        let secondQuestion = {
            id: 6,
            en: "second question?",
            da: "andet spørgsmål?"
        };  
        mock.onPost("/question/").reply(200, secondQuestion)

        let wrapper = mountRecommenderPage()

        await runAllPromises()
        wrapper.update()

        wrapper.find("#"+ answer.toLowerCase() +"_btn").simulate("click")

        await runAllPromises()
        wrapper.update()
        
        const title = wrapper.find(".title");
        expect(title.get(0).props["children"]).toBe('Q2: second question?');
    })

test("Answer redirects on 20th question", async () =>{
    let secondQuestion = {
        id: 6,
        en: "second question?",
        da: "andet spørgsmål?"
    };
    mock.onPost("/question/").reply(200, secondQuestion)

    let mockAnswers = [] as Answer[]
    for(let i = 0; i < 19; i++){
        mockAnswers = mockAnswers.concat([new Answer({id:28,en:"Do you like politics?",da:"Kan du lide politik?"} as Question, Answer_Enum.YES)])
    }
    history.push("/quiz/", {routeTo: "/done/", state:{routeTo:"/done/", answers:mockAnswers, question:undefined}})

    let wrapper = mount(
        <Router history={history}>
            <Route exact path={"/quiz/"}>
                <Recommender />
            </Route>
            <Route exact path={"/done/"}>
                <h1>Done</h1>
            </Route>
        </Router>)

    await runAllPromises()
    wrapper.update()

    wrapper.find("#yes_btn").simulate("click")

    await runAllPromises()
    wrapper.update()
    
    const title = wrapper.find("h1");
    expect(title.get(0).props["children"] as string).toBe('Done');
    
})

