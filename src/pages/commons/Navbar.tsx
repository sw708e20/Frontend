import logo from "../../img/logo32.png";
import { Translation } from "react-i18next";
import { changeLang, getLang, setNavbarChangeHandler } from "../../i18n/i18n";
import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle'
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

interface NavbarComponentState {
    lang: string;
}

class NavbarComponent extends React.Component<any, NavbarComponentState> {

    constructor(props: any) {
        super(props);
        setNavbarChangeHandler(this.updateLang);

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
            <Navbar bg="dark" variant="dark" className='justify-content-between'>
                <Navbar.Brand href="/">
                    <img alt="" src={logo} width="32" height="32" className="d-inline-block align-top" />{' '}
                    <Translation>
                        {
                            t => <span>{t('index.title')}</span>
                        }
                    </Translation>
                </Navbar.Brand>
                <NavDropdown style={{minWidth:0}} id={'lang-drop'} title={this.state.lang}>
                        <NavDropdown.Item className='dropdown-menu-right' onClick={() => { changeLang('en') }}>EN</NavDropdown.Item>
                        <NavDropdown.Item className='dropdown-menu-right' onClick={() => { changeLang('da') }}>DA</NavDropdown.Item>
                    </NavDropdown>
            </Navbar>
        )
    }
}

export default NavbarComponent;