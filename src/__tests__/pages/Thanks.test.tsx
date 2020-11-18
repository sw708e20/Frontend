import { render } from '@testing-library/react';
import ThanksPage from '../../pages/Thanks';
import {act} from "react-dom/test-utils";
import {changeLang} from "../../i18n/i18n";
import React from "react";
import '../../i18n/i18n';
import { Router } from 'react-router-dom';
import {createMemoryHistory} from "history";

let history = createMemoryHistory();

const changeLanguage = (lang: string) => {
    act(() => {
        changeLang(lang)
    })
}

beforeEach(() => {
    changeLang('en')
})

const renderThanksPage = () => {
    return render(<Router history={history}><ThanksPage /></Router>)
}

test('thanks title EN', () => {
    const {getByText} = renderThanksPage();
    const title = getByText(/Thanks/i);
    expect(title).toBeInTheDocument();
    expect(title.nodeName).toBe('SPAN');
})

test('thanks title DA', () => {
    const {getByText} = renderThanksPage();

    changeLanguage('da');

    const title = getByText(/^Tak$/i);
    expect(title).toBeInTheDocument();
    expect(title.nodeName).toBe('SPAN');
})

test('thanks content EN', () => {
    const {getByText} = renderThanksPage();
    const text = getByText(/Thank you for your answer/i);
    expect(text).toBeInTheDocument();
    expect(text.nodeName).toBe('SPAN');
})

test('thanks content DA', () => {
    const {getByText} = renderThanksPage();

    changeLanguage('da');

    const text = getByText(/Mange tak for din besvarelse/i);
    expect(text).toBeInTheDocument();
    expect(text.nodeName).toBe('SPAN');
})