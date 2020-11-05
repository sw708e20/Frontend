import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { ReactNode } from 'react';
import { Question, questionManager, Answer_Enum, getAnswerString, Answer } from "../services/QuestionManager";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Translation } from "react-i18next";
import '../styling/HomePage.css'


interface IRecommenderState {
    routeTo: string
    answers: Array<Answer>
    question?: Question;
}

interface IHistoryState{
    routeTo: string
    isLoading: boolean
    state: IRecommenderState    
}


class Recommender extends React.Component<RouteComponentProps, IRecommenderState> {

    answer_options: Answer_Enum[] = [Answer_Enum.YES, Answer_Enum.PROBABLY, Answer_Enum.DONT_KNOW, Answer_Enum.PROBABLY_NOT, Answer_Enum.NO];

    constructor(props:any) {
        super(props);
        
        let historicState = this.props.location.state as IHistoryState

        if(historicState.state !== undefined){
            this.state = historicState.state
        }
        else
            this.state = {routeTo: historicState.routeTo, answers: [] ,question: undefined};
    }
    
    componentDidMount() : void {
        if(this.state.answers.length > 0){
            this.getNextQuestion(this.state.answers)
        }
        else{
            questionManager.getFirstQuestion().then((qst) => {
                let newState = {
                    routeTo: this.state.routeTo,
                    answers: this.state.answers,
                    question: qst
                }
                
                this.props.history.replace("/quiz/", {routeTo: this.state.routeTo, isLoading: false, state: newState})
            });
        }
    }

    renderTitle() : ReactNode {
        let historicState = this.props.location.state as IHistoryState
        return (
            <h1 className={'title'}>Q{historicState.state.answers.length + 1}: {historicState.state.question? historicState.state.question.question: "null"} </h1>
        )
    }

    renderAnswerOptions() : ReactNode {
        const elems:React.ReactElement[] = [];

        for (let answer of this.answer_options) {
            let stringvalue = getAnswerString(answer);
            elems.push(
                <button onClick={() => this.onAnswerGiven(answer)} className={'btn btn-primary next-btn edu-btn div-spacing'}>
                    <Translation>
                        {
                            t => <span>{t(stringvalue)}</span>
                        }
                    </Translation>
                </button>
            )
            elems.push(<br/>)
        }

        return (
            <div>
                {elems}
            </div>
        )
    }

    onAnswerGiven(answer_value : Answer_Enum) : void{
        let historicState = this.props.location.state as IHistoryState
        if(!historicState.state.question || historicState.isLoading){
            return;
        }


        let new_answer = new Answer(historicState.state.question, answer_value)
        
        let answers = historicState.state.answers.concat([new_answer])
        
        const { history } = this.props

        if(answers.length >= 20){
            history.push(historicState.state.routeTo, answers)
        }else{
            this.getNextQuestion(answers)
        }
    }
    getNextQuestion(answers: Answer[]) : void{
        let historicState = this.props.location.state as IHistoryState
        const { history } = this.props

        history.replace("/quiz/",{
            routeTo: historicState.routeTo,
            isLoading: true,
            state:{
            routeTo: historicState.state.routeTo,
            answers: historicState.state.answers,
            question: historicState.state.question
            }
        })
        questionManager.getNextQuestion(answers).then((qst : Question)=>{
            
            history.replace("/quiz/",{
                routeTo: historicState.routeTo,
                isLoading: false,
                state:{
                routeTo: historicState.state.routeTo,
                answers: historicState.state.answers,
                question: historicState.state.question
                }
            })
            
            let newState = {
                routeTo: historicState.state.routeTo,
                answers: answers,
                question: qst
            };

            history.push("/quiz/" ,{routeTo: historicState.state.routeTo, isLoading: false, state: newState })
        });
    }

    

    render() : ReactNode {
        return (
            <div>
                <div className={'row justify-content-center'}>
                    {this.renderTitle()}
                </div>
                <div className={'row justify-content-center'}>
                    {this.renderAnswerOptions()}
                </div>
            </div>

        )
    }
}

export default withRouter(Recommender);
