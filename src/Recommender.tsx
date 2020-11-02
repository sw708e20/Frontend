import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import { Question, questionManager, Answer_Enum, getAnswerString, Answer } from "./QuestionManager";
import { withRouter, RouteComponentProps } from 'react-router-dom';


interface IRecommenderState {
    routeTo: string
    answers: Array<Answer>
    question?: Question;
}


class Recommender extends React.Component<RouteComponentProps, IRecommenderState> {

    answer_options: Answer_Enum[] = [Answer_Enum.YES, Answer_Enum.PROBABLY, Answer_Enum.DONT_KNOW, Answer_Enum.PROBABLY_NOT, Answer_Enum.NO];

    constructor(props:any) {
        super(props);
        
        this.state = {routeTo: this.props.location.state as string,answers: [] ,question: undefined};
    }

    componentDidMount() {
        questionManager.getFirstQuestion().then((qst) => {
            this.setState({ 
                answers: this.state.answers,
                question: qst
            })
        });
    }

    renderTitle() {
        return (
            <h1 className={'title'}>Q{this.state.answers.length + 1}: {this.state.question? this.state.question.question: "null"} </h1>
        )
    }

    renderAnswerOptions() {
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

    onAnswerGiven(answer_value : Answer_Enum){
        if(this.state.question === undefined){
            return;
        }

        let new_answer = new Answer(this.state.question, answer_value)
        
        let answers = this.state.answers.concat([new_answer])
        
        const { history } = this.props

        if(answers.length >= 20){
            history.push(this.state.routeTo, answers)
        }else{
            this.getNextQuestion(answers)
        }
    }

    getNextQuestion(answers: Answer[]){
        questionManager.getQuestion(answers).then((qst)=>{
            this.setState({
                answers: answers,
                question: qst
            })
        });
    }

    

    render() {
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
