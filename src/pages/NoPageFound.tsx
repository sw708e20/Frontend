import { Translation } from "react-i18next";
import React, { ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class NoPageFound extends React.Component<RouteComponentProps> {

    renderTitle(text_key: string) : ReactNode {
        return (
            <h1 className={'title'}>
                <Translation>
                    {
                        t => <span>{t(text_key)}</span>
                    }
                </Translation>
            </h1>
        )
    }

    renderBackButton(text_key: string) : ReactNode {
        return (
            <a href="/" className={'btn btn-secondary edu-btn next-btn'}>
                <Translation>
                    {
                        t => t(text_key)
                    }
                </Translation>
            </a>
        )
    }

    render() : ReactNode {
        return (
            <div className={'container-fluid d-flex flex-grow-1 align-items-center'}>
                <div className='d-flex flex-column flex-grow-1'>

                    <div className={'text-center'}>{this.renderTitle('no_page_found.title')}</div>
                    <hr/>
                    <div className={'text-center'}>{this.renderBackButton('no_page_found.back_button')}</div>
                </div>
                </div>
        )
    }
}

export default withRouter(NoPageFound);