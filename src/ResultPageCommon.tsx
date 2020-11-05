import React, {ReactElement} from "react";
import {Education, EducationType} from './QuestionManager'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, NavDropdown} from 'react-bootstrap';
import {Translation} from "react-i18next";
import logo from './img/logo32.png';
import {changeLang, getLang} from './i18n/i18n'

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
                        <NavDropdown id={'lang-drop'} title={getLang().toUpperCase()}>
                            <NavDropdown.Item onClick={() => {changeLang('en')}}>EN</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {changeLang('da')}}>DA</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export const resultPageCommon = new ResultPageCommon();