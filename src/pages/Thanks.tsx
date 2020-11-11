import 'bootstrap/dist/css/bootstrap.min.css';
import { Translation } from "react-i18next";
import React, { ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class ThanksPage extends React.Component<RouteComponentProps> {

    constructor(props:any) {
        super(props);
    }

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
                        t => <span>{t(text_key)}</span>
                    }
                </Translation>
            </h4>
        )
    }

    render() : ReactNode {
        return (
                <div>
                    <div>{this.renderTitle('thanks.thanks_title')}</div>
                    <hr/>
                    <div>{this.renderContent('thanks.thanks_content')}</div>
                </div>
        )
    }
}

export default withRouter(ThanksPage);
