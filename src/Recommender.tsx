import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Result from "./Result";
import ReactDOM from "react-dom";
import { Question, questionManager, Answer_Enum, getAnswerString } from "./QuestionManager";

interface IRecommenderProps {

}

interface IRecommenderState {
    question?: Question;
}


class Page extends React.Component<IRecommenderProps, IRecommenderState> {

    answer_options: Answer_Enum[] = [Answer_Enum.YES, Answer_Enum.PROBABLY, Answer_Enum.DONT_KNOW, Answer_Enum.PROBABLY_NOT, Answer_Enum.NO];

    constructor(props:any) {
        super(props);
        this.state = {question: undefined};
    }
    
    componentDidMount() {
        questionManager.getFirstQuestion().then((qst) => {
            this.setState({
                question: qst
            })
        });
        
    }

    renderTitle() {
        return (
            <h1 className={'title'}> {this.state.question? this.state.question.question: "null"} </h1>
        )
    }

    renderAnswerOptions() {
        let answerOptions:string[] = ['Yes', 'No', 'Probably', 'Probably not', 'Dont know']
        const elems:React.ReactElement[] = [];

        for (let answer of this.answer_options) {
            let stringvalue = getAnswerString(answer);
            elems.push(
                <ToggleButtonGroup type={'radio'} value={answerOptions} name={'answer'} className={'div-spacing'}>
                    <ToggleButton className={'answer-choice edu-btn'} value={answer}> {stringvalue} </ToggleButton>
                </ToggleButtonGroup>
            )
            elems.push(<br/>)
        }

        return (
            <div>
                {elems}
            </div>
        )
    }

    renderNextButton(text: string) {
        return (
            <button className={"btn btn-primary next-btn edu-btn"} onClick={() =>
                ReactDOM.render(
                    <React.StrictMode>
                        <Result />
                    </React.StrictMode>,
                    document.getElementById('root')
                )
            }> {text} </button>
        )
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
                <div className={'row justify-content-center'}>
                    {this.renderNextButton('Next')}
                </div>
            </div>

        )
    }
}

function Recommender() {
    return (
        <div className="App">
            <header className="App-header">
                <Page />
            </header>
        </div>
    );
}

export default Recommender;