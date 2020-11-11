import {createMemoryHistory} from "history";
import '../i18n/i18n';
import {changeLang} from '../i18n/i18n'
import {act} from "react-dom/test-utils";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import Recommender from "./Recommender";
import React from "react";


Enzyme.configure({adapter: new Adapter()});

let history = createMemoryHistory();

beforeEach(() => {
    history.push('/quiz/', {state: {question: 'hi', answers: [{question: {id: 0, en: 'asd', da: 'dsa'}}]}});
    changeLanguage('en');
})

afterEach(() => {
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