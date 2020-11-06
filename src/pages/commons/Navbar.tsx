import logo from "../../img/logo32.png";
import {Translation} from "react-i18next";
import {Navbar, NavDropdown} from "react-bootstrap";
import {changeLang, getLang} from "../../i18n/i18n";
import React from "react";

interface NavbarComponentState {
    lang: string;
}

class NavbarComponent extends React.Component<any, NavbarComponentState> {

    constructor(props:any) {
        super(props);

        this.state = {
            lang: getLang().toUpperCase()
        }
    }

    updateLang = (lang: string) => {
        this.setState({
            lang: lang.toUpperCase()
        })
    };

    render() {
        return (
            <div className={'edu-nav'}>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">
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
                        <NavDropdown id={'lang-drop'} title={this.state.lang}>
                            <NavDropdown.Item onClick={() => {changeLang('en', this.updateLang)}}>EN</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => {changeLang('da', this.updateLang)}}>DA</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default NavbarComponent;