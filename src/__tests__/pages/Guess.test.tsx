import React from "react";
import GuessPage from '../../pages/Guess';
import EducationSelector from '../../pages/Guess';
import SearchField from '../../pages/Guess';
import {Education} from '../../services/QuestionManager'
import { Router } from 'react-router-dom';
import '../../i18n/i18n';
import {changeLang} from '../../i18n/i18n'
import {act} from "react-dom/test-utils";
import Enzyme, {shallow, mount, render as enzymeRender} from 'enzyme';
import { createMemoryHistory } from 'history'
import Adapter from 'enzyme-adapter-react-16'
import { render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../services/http-common';

Enzyme.configure({adapter: new Adapter()});

const answerData = [
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2},
    {question: 'sdjkhf', value: 2}
]

let history = createMemoryHistory();
let mock = new MockAdapter(axios)


beforeEach(() => {
    const education: Education[] = [{
        id: -1,
        description: 'meget spændende uddannelse',
        name: 'Anvendt filosofi',
        education_types: []
    }];
    mock.onPost('/recommend/').reply(200, education);
    history.push('/guess', answerData);
    changeLanguage('en');
})

afterEach(() => {
    history = createMemoryHistory();
    mock.reset()
})

const changeLanguage = (lang: string) => {
    act(() => {
        changeLang(lang)
    })
}

const renderGuessPage = () => {
    return render(<Router history={history} ><GuessPage /></Router>)
}

const enzymeRenderGuessPage = () => {
    return enzymeRender(<Router history={history} ><GuessPage /></Router>);
}

const mountGuessPage = () => {
    return mount(<Router history={history}><GuessPage /></Router>)
}

const renderEducationSelector = () => {
    return render(<Router history={history} ><EducationSelector /></Router>)
}

const enzymeRenderEducationSelector = () => {
    return enzymeRender(<Router history={history} ><EducationSelector /></Router>);
}

const renderSearchField = () => {
    return render(<SearchField />)
}

const enzymeRenderSearchField = () => {
    return enzymeRender(<Router history={history} ><SearchField /></Router>);
}

test('recommended education title component', () => {
    const wrapper = enzymeRenderGuessPage();
    const elem = wrapper.find('#guess-title');
    expect(elem.length).toBe(1);
    expect(elem.get(0).type).toBe('tag')
})

test('recommended education title EN', () => {
    const {getByText} = renderGuessPage();
    const title = getByText(/We think your education is.../i);
    expect(title).toBeInTheDocument();
    expect(title.nodeName).toBe('SPAN');
})

test('recommended education title DA', () => {
    const {getByText} = renderGuessPage();

    changeLanguage('da');

    const title = getByText(/Vi tror din uddannelse er.../i);
    expect(title).toBeInTheDocument();
})

test('correct? title component', () => {
    const wrapper = enzymeRenderGuessPage();
    const elem = wrapper.find('#is-correct-title');
    expect(elem.length).toBe(1);
    expect(elem.get(0).type).toBe('tag')
})

test('correct? title EN', () => {
    const {getByText} = renderGuessPage();
    const title = getByText(/Is this correct?/i);
    expect(title).toBeInTheDocument();
    expect(title.nodeName).toBe('SPAN');
})

test('correct? title DA', () => {
    const {getByText} = renderGuessPage();

    changeLanguage('da');

    const title = getByText(/Er dette korrekt?/i);
    expect(title).toBeInTheDocument();
})

test('yes button component', () => {
    const wrapper = enzymeRenderGuessPage();
    const elem = wrapper.find('#yes-btn');
    expect(elem.length).toBe(1);
    expect(elem.get(0).type).toBe('tag')
})

test('yes button EN', () => {
    const {getByText} = renderGuessPage();
    const yesBtn = getByText(/Yes/i);
    expect(yesBtn).toBeInTheDocument();
    expect(yesBtn.nodeName).toBe('SPAN');
})

test('yes button DA', () => {
    const {getByText} = renderGuessPage();

    changeLanguage('da');

    const yesBtn = getByText(/Ja/i);
    expect(yesBtn).toBeInTheDocument();
})

test('no button component', () => {
    const wrapper = enzymeRenderGuessPage();
    const elem = wrapper.find('#no-btn');
    expect(elem.length).toBe(1);
    expect(elem.get(0).type).toBe('tag')
})

test('no button EN', () => {
    const {getByText} = renderGuessPage();
    const noBtn = getByText(/No/i);
    expect(noBtn).toBeInTheDocument();
})

test('no button DA', () => {
    const {getByText} = renderGuessPage();

    changeLanguage('da');

    const noBtn = getByText(/Nej/i);
    expect(noBtn).toBeInTheDocument();
})

const runAllPromises = () => new Promise(setImmediate)

test('guess container with mount', async () => {
    const education: Education[] = [{
        id: -1,
        description: 'meget spændende uddannelse',
        name: 'Datalogi',
        education_types: []
    }];
    mock.onPost('/recommend/').reply(200, education);

    const wrapper = mountGuessPage();
    
    await runAllPromises();
    wrapper.update()

    const title = wrapper.find("div.card-header")
    expect(title.length).toBe(1);
    expect(title.childAt(0).get(0).props["children"]).toBe('Datalogi');
})
