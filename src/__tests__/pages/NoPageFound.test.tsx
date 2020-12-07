import { render } from '@testing-library/react';
import NoPageFound from '../../pages/NoPageFound';
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
    return render(<Router history={history}><NoPageFound /></Router>)
}

test('thanks title EN', () => {
    const {getByText} = renderThanksPage();
    const title = getByText(/This page was not found/i);
    expect(title).toBeInTheDocument();
    expect(title.nodeName).toBe('SPAN');
})

test('thanks title DA', () => {
    const {getByText} = renderThanksPage();

    changeLanguage('da');

    const title = getByText(/^Denne side blev ikke fundet$/i);
    expect(title).toBeInTheDocument();
    expect(title.nodeName).toBe('SPAN');
})

test('thanks content EN', () => {
    const {getByText} = renderThanksPage();
    const text = getByText(/Back/i);
    expect(text).toBeInTheDocument();
    expect(text.nodeName).toBe('A');
})

test('thanks content DA', () => {
    const {getByText} = renderThanksPage();

    changeLanguage('da');

    const text = getByText(/Tilbage/i);
    expect(text).toBeInTheDocument();
    expect(text.nodeName).toBe('A');
})