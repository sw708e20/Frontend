import 'bootstrap/dist/css/bootstrap.min.css';
import { Translation } from "react-i18next";
import React, { ReactNode } from 'react';
import {resultPageCommon} from './commons/ResultPageCommon'
import { questionManager, Answer, Education} from "../services/QuestionManager";
import { RouteComponentProps, withRouter } from 'react-router-dom';

class ThanksPage extends React.Component<RouteComponentProps> {

    constructor(props:any) {
        super(props);

        this.state = {
            answers: this.props.location.state as Answer[],
            loading: true,
            list: []
        };
    }

    componentDidMount() : void{
        this.setState({
            loading: true
        })
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

    render() {
        return (
            
            <div>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('thanks.thanks_title')}
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    <div className={'primary-edu-block div-spacing'}>
                    <div>
                <div className={'row justify-content-center'}>
                    <h3 className={'education-header'}> {"Awaer"} </h3>
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    <div className={'col-10'}> {"Test2"} </div>
                </div>
            </div>
                    <hr/>
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ThanksPage);
