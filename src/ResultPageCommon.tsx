import React, {ReactElement} from "react";
import {Education, EducationType} from './QuestionManager'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavDropdown} from 'react-bootstrap';
import {getI18n, Translation, useTranslation} from "react-i18next";
import logo from './img/logo32.png';
import cookie from 'react-cookies';
import i18n from './i18n/i18n'

class ResultPageCommon {
    renderEducationInfo(edu: Education) {
        return (
            <div>
                <div className={'row justify-content-center'}>
                    <h3 className={'education-header'}> {edu.name} </h3>
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    <div className={'col-10'}> {edu.description} </div>
                </div>
            </div>
        )
    }

    renderEducationTypes(eduTypes: EducationType[]) {
        let elems: ReactElement[] = []

        for (let eduType of eduTypes) {
            elems.push(
                <div key={eduType.id} className={'row justify-content-center'}>
                    <div className={'col-6'}><p> {eduType.name} </p></div>
                    <div className={'col-6'}><a href={eduType.url}> Link to www.ug.dk </a></div>
                </div>
            )
        }

        return elems
    }

    saveLang(lang: string) {
        i18n.changeLanguage(lang).then(() => {
            cookie.save('lang', lang, {path: '/'});
        })
    }

    getLang(): string {
        let lang = cookie.load('lang');

        if (lang === undefined) lang = 'en';

        return lang
    }

    renderNavbar() {
        return (
            <div className={'edu-nav'}>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={logo}
                            width="32"
                            height="32"
                            className="d-inline-block align-top"
                        />{' '}
                        <Translation>
                            {
                                t => <span>{t('index.title')}</span>
                            }
                        </Translation>
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown id={'lang-drop'} title={this.getLang().toUpperCase()}>
                            <NavDropdown.Item onClick={() => {this.saveLang('en')}}>EN</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {this.saveLang('da')}}>DA</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export const resultPageCommon = new ResultPageCommon();