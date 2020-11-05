import 'bootstrap/dist/css/bootstrap.min.css';
import React , {ReactElement, ReactNode} from 'react';
import {resultPageCommon} from './ResultPageCommon'
import { questionManager, Answer, Education} from "./QuestionManager";
import { Translation } from "react-i18next";

interface IRecommenderProps {
    answers: Answer[]
}

interface IRecommenderState {
    loading: boolean
    list : Education[]
    lang: string
}

class ResultPage extends React.Component<IRecommenderProps, IRecommenderState> {
    constructor(props:any) {
        super(props);
        
        this.state = {
            loading: true,
            list: [],
            lang: resultPageCommon.getLang()
        };
    }

    componentDidMount() : void{
        this.getEducations()
        this.setState({
            loading: true,
            list: this.state.list,
            lang: this.state.lang
        })
    }

    updateLang = (lang: string) => {
        this.setState({
            loading: this.state.loading,
            list: this.state.list,
            lang: lang
        })
    }

    getEducations() : void {
        questionManager.getRecommendations(this.props.answers).then((res)=>{
            this.setState({
                loading: false,
                list: res,
                lang: this.state.lang
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
                {resultPageCommon.renderNavbar(this.updateLang)}
                <header className="App-header">
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
                </header>
            </div>
        )
    }
}

function Result(results: Answer[]) : ReactElement {
    return (
        <div className="App">
            <ResultPage answers={results} />
        </div>
    );
}

export default Result;