import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Result from "./Result";
import ReactDOM from "react-dom";
import axios from 'axios';
import constants from './Constants';

class Page extends React.Component {
    getQuestion() {
        console.log(constants.errorMsg1);
        axios.get(`http://localhost:8000/question/`)
            .then(res => {
                const id = res.data;
                console.log(id);
            })
    }

    renderTitle() {
        return (
            <h1> {this.getQuestion()} </h1>
        )
    }

    renderAnswerOptions() {
        let answerOptions:string[] = ['Yes', 'No', 'Probably', 'Probably not', 'Dont know']
        const elems:React.ReactElement[] = [];

        for (let answer of answerOptions) {
            elems.push(
                <ToggleButtonGroup type={'radio'} value={answerOptions} name={'answer'} className={'div-spacing'}>
                    <ToggleButton className={'answer-choice edu-btn'} value={answer}> {answer} </ToggleButton>
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