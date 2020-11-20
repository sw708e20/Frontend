import { Translation } from "react-i18next";
import React, { ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class ThanksPage extends React.Component<RouteComponentProps> {

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

    renderContent(text_key: string) : ReactNode {
        return (
            <h4 className={'title'}>
                <Translation>
                    {
                        t => t(text_key)
                    }
                </Translation>
            </h4>
        )
    }

    render() : ReactNode {
        return (
            <div className={'container-fluid d-flex flex-grow-1 align-items-center'}>
                <div className='d-flex flex-column flex-grow-1'>

                    <div className={'text-center'}>{this.renderTitle('thanks.thanks_title')}</div>
                    <hr/>
                    <div className={'text-center'}>{this.renderContent('thanks.thanks_content')}</div>
                </div>
                </div>
        )
    }
}

export default withRouter(ThanksPage);
