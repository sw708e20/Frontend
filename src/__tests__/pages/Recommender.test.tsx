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
import React, { Children } from "react";
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

test('quiz answer yes EN', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#yes_btn") 
    expect(button.text()).toBe("Yes")
})

test('quiz answer yes DA', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    changeLanguage('da');


    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#yes_btn") 
    expect(button.text()).toBe("Ja")
    
})

test('quiz answer no EN', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#no_btn") 
    expect(button.text()).toBe("No")
})

test('quiz answer no DA', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    changeLanguage('da');


    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#no_btn") 
    expect(button.text()).toBe("Nej")
})

test('quiz answer probably EN', async () => {
    const wrapper = mountRecommenderPage()

    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#probably_btn") 
    expect(button.text()).toBe("Probably")
})

test('quiz answer probably DA', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    changeLanguage('da');


    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#probably_btn") 
    expect(button.text()).toBe("Måske")
})

test('quiz answer probably not EN', async () => {
    const wrapper = mountRecommenderPage()

    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#probably_not_btn") 
    expect(button.text()).toBe("Probably not")
})

test('quiz answer probably not DA', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    changeLanguage('da');


    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#probably_not_btn") 
    expect(button.text()).toBe("Måske ikke")
})

test('quiz answer dont know EN', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#dont_know_btn") 
    expect(button.text()).toBe("Don't know")
})

test('quiz answer dont know DA', async () => {
    const wrapper = mountRecommenderPage()
    
    await runAllPromises();
    wrapper.update();

    changeLanguage('da');


    await runAllPromises();
    wrapper.update();

    const button = wrapper.find("button#dont_know_btn") 
    expect(button.text()).toBe("Ved ikke")
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

