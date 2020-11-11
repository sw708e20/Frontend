import 'bootstrap/dist/css/bootstrap.min.css';
import { Translation } from "react-i18next";
import React, { ReactNode } from 'react';
import {resultPageCommon} from './commons/ResultPageCommon'
import { questionManager, Education} from "../services/QuestionManager";
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IRecommenderState {
    answers: { [key: number]: number; };
    loading: boolean
    list : Education[]
}

class ResultPage extends React.Component<RouteComponentProps, IRecommenderState> {

    constructor(props:any) {
        super(props);

        this.state = {
            answers: this.props.location.state as { [key: number]: number; },
            loading: true,
            list: []
        };
    }

    componentDidMount() : void{
        this.getEducations()
        this.setState({
            loading: true,
            list: this.state.list,
        })
    }

    getEducations() : void {
        questionManager.getRecommendations(this.state.answers).then((res)=>{
            this.setState({
                loading: false,
                list: res,
            })
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

    renderPrimaryRecommendation() : ReactNode {
        const elems:React.ReactElement[] = [];
        const primary:Education = this.state.list[0];

        elems.push(
            <div className={'primary-edu-block div-spacing'}>
                { resultPageCommon.renderEducationInfo(primary) }
                <hr/>
                { resultPageCommon.renderEducationTypes(primary.education_types) }
            </div>
        )

        return (
            <div> { elems } </div>
        )
    }

    renderRemainingRecommendations() : ReactNode {
        const elems:React.ReactElement[] = [];

        for (let edu2 of this.state.list.slice(1, this.state.list.length)) {
            let edu:Education = edu2;

            elems.push(
                <div className={'edu-block div-spacing'}>
                    { resultPageCommon.renderEducationInfo(edu) }
                    <hr/>
                    { resultPageCommon.renderEducationTypes(edu.education_types) }
                </div>
            )
        }

        return (
            <div> {elems} </div>
        )
    }

    render() {
        return (
            <div>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('result.rec_title')}
                </div>
                <div className={'row justify-content-center'}>
                    {this.state.loading ? '' : this.renderPrimaryRecommendation()}
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('result.rem_title')}
                </div>
                <div className={'row justify-content-center'}>
                    {this.state.loading ? '' : this.renderRemainingRecommendations()}
                </div>
            </div>
        )
    }
}

export default withRouter(ResultPage);
