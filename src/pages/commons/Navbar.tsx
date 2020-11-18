import logo from "../../img/logo32.png";
import { Translation } from "react-i18next";
import { changeLang, getLang, setNavbarChangeHandler } from "../../i18n/i18n";
import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle'
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "flag-icon-css/sass/flag-icon.scss";

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

    getButtonText(lang: String) {
        let countryCode;
        switch (lang.toLowerCase()) {
            case "da":
                countryCode = 'dk';
                break;
            case "en":
                countryCode = 'gb';
                break;
            default:
                countryCode = 'gb';
                break;
        }
        
        return (
            <span className={'flag-icon flag-icon-'+countryCode}/>
        )
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
                <NavDropdown style={{minWidth:0}} id={'lang-drop'} title={this.getButtonText(this.state.lang)}>
                    <NavDropdown.Item className='dropdown-menu-right' onClick={() => { changeLang('en') }}>{this.getButtonText('en')}</NavDropdown.Item>
                    <NavDropdown.Item className='dropdown-menu-right' onClick={() => { changeLang('da') }}>{this.getButtonText('da')}</NavDropdown.Item>
                    </NavDropdown>
            </Navbar>
        )
    }
}

export default NavbarComponent;