import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { ReactElement, ReactNode } from 'react';
import Result from "./Result";
import ReactDOM from "react-dom";
import { Question, questionManager, Answer_Enum, getAnswerString, Answer } from "./QuestionManager";

interface IRecommenderProps {

}

interface IRecommenderState {
    answers: Array<Answer>
    question?: Question;
}


class Page extends React.Component<IRecommenderProps, IRecommenderState> {

    answer_options: Answer_Enum[] = [Answer_Enum.YES, Answer_Enum.PROBABLY, Answer_Enum.DONT_KNOW, Answer_Enum.PROBABLY_NOT, Answer_Enum.NO];

    constructor(props:any) {
        super(props);
        
        this.state = {answers: [] ,question: undefined};
    }
    
    componentDidMount() : void {
        questionManager.getFirstQuestion().then((qst) => {
            this.setState({
                answers: this.state.answers,
                question: qst
            })
        });
    }

    renderTitle() : ReactNode {
        return (
            <h1 className={'title'}>Q{this.state.answers.length + 1}: {this.state.question? this.state.question.question: "null"} </h1>
        )
    }

    renderAnswerOptions() : ReactNode {
        const elems:React.ReactElement[] = [];

        for (let answer of this.answer_options) {
            let stringvalue = getAnswerString(answer);
            elems.push(
                <button onClick={() => this.onAnswerGiven(answer)} className={'btn btn-primary next-btn edu-btn div-spacing'}> {stringvalue} </button>
            )
            elems.push(<br/>)
        }

        return (
            <div>
                {elems}
            </div>
        )
    }

    onAnswerGiven(answer_value : Answer_Enum) : void {
        if(this.state.question === undefined) {
            return;
        }
        
        let new_answer = new Answer(this.state.question, answer_value)
        
        let answers = this.state.answers.concat([new_answer])
        
        if(answers.length >= 20){
            this.finishQuiz()
        }else{
            this.getNextQuestion(answers)
        }
    }

    getNextQuestion(answers: Answer[]) : void {
        questionManager.getQuestion(answers).then((qst)=>{
            this.setState({
                answers: answers,
                question: qst
            })
        });
    }

    finishQuiz() : void {
        ReactDOM.render(
            <React.StrictMode>
                <Result />
            </React.StrictMode>,
            document.getElementById('root'))
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

function Recommender() : ReactElement {
    return (
        <div className="App">
            <header className="App-header">
                <Page />
            </header>
        </div>
    );
}

export default Recommender;