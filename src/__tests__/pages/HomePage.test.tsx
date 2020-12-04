import React from "react";
import { render } from '@testing-library/react';
import IndexPage from '../../pages/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../i18n/i18n';
import {changeLang} from '../../i18n/i18n'
import {act} from "react-dom/test-utils";


const renderPage = () => {
    return render(<Router><IndexPage /></Router>)
}

test('logo', () => {
    const { getByAltText } = renderPage();
    const logo = getByAltText(/EduFinder/i);
    expect(logo).toBeInTheDocument();
    expect(logo.className).toBe('header-logo img-fluid ')
})

test('recommender button EN', () => {
    const { getByText } = renderPage();
    const recBtn = getByText(/Education recommender/i);
    expect(recBtn).toBeInTheDocument();
})

test('guessing game button EN', () => {
    const { getByText } = renderPage();
    const guessBtn = getByText(/Guess education/i);
    expect(guessBtn).toBeInTheDocument();
})

test('recommender button DA', () => {
    const { getByText } = renderPage();

    act(() => {
        changeLang('da')
    })

    const recBtn = getByText(/Gæt uddannelse/i);
    expect(recBtn).toBeInTheDocument();
})

test('guessing game button DA', () => {
    const { getByText } = renderPage();

    act(() => {
        changeLang('da')
    })

    const guessBtn = getByText(/Gæt uddannelse/i);
    expect(guessBtn).toBeInTheDocument();
})
