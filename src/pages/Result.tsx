import { Translation } from "react-i18next";
import React, { ReactNode } from 'react';
import {resultPageCommon} from './commons/ResultPageCommon'
import { questionManager, Answer, Education} from "../services/QuestionManager";
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IRecommenderState {
    answers: Answer[]
    loading: boolean
    list : Education[]
}

class ResultPage extends React.Component<RouteComponentProps, IRecommenderState> {

    constructor(props:any) {
        super(props);

        this.state = {
            answers: this.props.location.state as Answer[],
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
                        t => t(text_key)
                    }
                </Translation>
            </h1>
        )
    }

    renderPrimaryRecommendation() : ReactNode {
        const primary:Education = this.state.list[0];

        return (
            <div className={'row justify-content-center my-4'}>
                <div className={'col-lg-6'}>
                    <div className={'card text-center bg-info'}>
                        { resultPageCommon.renderEducationInfo(primary)}
                        { resultPageCommon.renderEducationTypes(primary.education_types)}
                    </div>
                </div>
            </div>
        )
    }

    renderRemainingRecommendations() : ReactNode[] {
        const elems:React.ReactElement[] = [];

        for (let edu2 of this.state.list.slice(1, this.state.list.length)) {
            let edu:Education = edu2;

            elems.push(

                <div className='row justify-content-center mt-4' key={edu.id + '_card'}>
                    <div className={'col-lg-6'}>

                    <div className={'card text-center bg-info'}>
                        { resultPageCommon.renderEducationInfo(edu) }
                        { resultPageCommon.renderEducationTypes(edu.education_types) }
                    </div>
                    </div>
                </div>
            )
        }

        return elems;
    }

    render() {
        return (
            <div className='container-fluid'>
                <div className='row justify-content-center text-center'>
                    {this.renderTitle('result.rec_title')}
                </div>
                {this.state.loading ? '' : this.renderPrimaryRecommendation()}
                <div className='row justify-content-center text-center'>
                    {this.renderTitle('result.rem_title')}
                </div>
                {this.state.loading ? '' : this.renderRemainingRecommendations()}
            </div>
        )
    }
}

export default withRouter(ResultPage);
