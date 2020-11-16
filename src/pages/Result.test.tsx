import React from "react";
import ResultPage from './Result';
import {Education} from '../services/QuestionManager'
import { Router } from 'react-router-dom';
import '../i18n/i18n';
import {changeLang} from '../i18n/i18n'
import {act} from "react-dom/test-utils";
import Enzyme, {mount, render as enzymeRender} from 'enzyme';
import { createMemoryHistory } from 'history'
import Adapter from 'enzyme-adapter-react-16'
import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from '../services/http-common';

Enzyme.configure({adapter: new Adapter()});

let history = createMemoryHistory();

const answerData = [
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2}
]

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
        education_types: []
    }
];

let mock = new MockAdapter(axios);

beforeEach(() => {
    history.push('/guess', answerData);
    changeLanguage('en');
    mock.onPost('/recommend/').reply(200, educations)
})

afterEach(() => {
    history = createMemoryHistory();
    mock.reset();
})

const changeLanguage = (lang: string) => {
    act(() => {
        changeLang(lang)
    })
}

const runAllPromises = () => new Promise(setImmediate);

const renderResultPage = () => {
    return render(<Router history={history}><ResultPage/> </Router>)
}

const enzymeRenderResultPage = () => {
    return enzymeRender(<Router history={history}><ResultPage/> </Router>)
}

const mountResultPage = () => {
    return mount(<Router history={history}><ResultPage/></Router>)
}

test('title components', () => {
    const wrapper = enzymeRenderResultPage();
    const elem = wrapper.find('.title');
    expect(elem.length).toBe(2);
    expect(elem.get(0).type).toBe('tag')
    expect(elem.get(1).type).toBe('tag')
})

test('recommended education title EN', () => {
    const {getAllByText} = renderResultPage();
    const title = getAllByText(/Recommended education/i);
    for (let t of title) {
        expect(t).toBeInTheDocument();
        expect(t.nodeName).toBe('SPAN');
    }
})

test('recommended education title DA', () => {
    const {getAllByText} = renderResultPage();

    changeLanguage('da');

    const title = getAllByText(/Anbefalet uddannelse/i);
    for (let t of title) {
        expect(t).toBeInTheDocument();
        expect(t.nodeName).toBe('SPAN');
    }
})

test('other educations title EN', () => {
    const {getAllByText} = renderResultPage();
    const title = getAllByText(/You may also be interested in/i);
    for (let t of title) {
        expect(t).toBeInTheDocument();
        expect(t.nodeName).toBe('SPAN');
    }
})

test('other educations title DA', () => {
    const {getAllByText} = renderResultPage();

    changeLanguage('da');

    const title = getAllByText(/Du vil måske også være interesseret i/i);
    for (let t of title) {
        expect(t).toBeInTheDocument();
        expect(t.nodeName).toBe('SPAN');
    }
})

test('render educations', async () => {
    mock.onPost('/recommend/').reply(200, educations);

    const wrapper = mountResultPage();
    await runAllPromises();
    wrapper.update();

    const titles = wrapper.find('.education-header');
    expect(titles.get(0).props.children[1]).toBe('Anvendt filosofi');
    expect(titles.get(1).props.children[1]).toBe('Software');
})