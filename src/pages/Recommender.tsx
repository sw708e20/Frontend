import 'jquery/dist/jquery.min.js';
import React, { ReactNode } from 'react';
import { Question, questionManager, Answer_Enum, getAnswerString, Answer } from "../services/QuestionManager";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Translation } from "react-i18next";
import {getLang, setRecChangeHandler} from "../i18n/i18n";


interface IRecommenderState {
    routeTo: string
    answers: Array<Answer>
    question?: Question;
    lang: string;
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

        setRecChangeHandler(this.updateLang);
        
        let historicState = this.props.location.state as IHistoryState

        if(historicState.state !== undefined){
            this.state = historicState.state
        }
        else
            this.state = {routeTo: historicState.routeTo, answers: [] ,question: undefined, lang: getLang()};
    }
    
    componentDidMount() : void {
        if(this.state.answers.length === 0){
            questionManager.getFirstQuestion().then((qst) => {
                let newState = {
                    routeTo: this.state.routeTo,
                    answers: this.state.answers,
                    question: qst,
                    lang: this.state.lang
                }
                
                this.props.history.replace("/quiz/", {routeTo: this.state.routeTo, isLoading: false, state: newState})
            });
        } else {
            this.getNextQuestion(this.state.answers);
        }
    }

    updateLang = (lang: string) => {
        this.setState({
            routeTo: this.state.routeTo,
            answers: this.state.answers,
            question: this.state.question,
            lang: lang
        })
    }

    getQuestionWithLocale(q: Question) {
        let lang = getLang()
        switch(lang) {
            case 'en':
                return q.en
            case 'da':
                return q.da
            default:
                return q.en
        }
    }

    renderTitle() : ReactNode {
        let historicState = this.props.location.state as IHistoryState
        let answers = historicState.state.answers;
        let question = historicState.state.question;
        
        if (question !== undefined) {
            return (<h1 className={'title'}>{`Q${answers.length + 1}: ${this.getQuestionWithLocale(question)}`}</h1>);
        } else {
            return (<Translation>{t => <h1 className={'title'}>{t('result.loading_placeholder')}</h1>}</Translation>);
        }
    }

    renderAnswerOptions() : ReactNode {
        const elems:React.ReactElement[] = [];

        let key = 0
        for (let answer of this.answer_options) {
            let stringvalue = getAnswerString(answer);
            elems.push(
                <div className='d-flex justify-content-center' key={key++}>
                        <button id={Answer_Enum[answer].toLowerCase() + "_btn"} onClick={() => this.onAnswerGiven(answer)} className={'btn btn-secondary mt-3 recommender-btn'}>
                        <Translation>
                            {
                            t => t(stringvalue)
                            }
                        </Translation>
                    </button>
                </div>
            )
        }

        return (elems)
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

    

  render(): ReactNode {
    return (
      <div className={'container-fluid d-flex flex-grow-1 align-items-center'}>
        <div className='d-flex flex-column flex-grow-1'>
          <div className={'d-flex justify-content-center text-center'}>
            {this.renderTitle()}
          </div>
          <div className='d-flex flex-column'>
            {this.renderAnswerOptions()}
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(Recommender);
