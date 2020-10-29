import 'bootstrap/dist/css/bootstrap.min.css';
import React, {ReactElement} from 'react';
import axios from "axios";
import {Education, EducationType, Question, questionManager, Answer} from './QuestionManager'
import {resultPageCommon} from "./ResultPageCommon";

interface IGuessProps {
    answers: Answer[];
}

interface IGuessState {
    guess: Education;
    actual?: Education;
    educations: Education[];
}

class GuessPage extends React.Component<IGuessProps, IGuessState> {

    constructor(props:any) {
        super(props);

        this.state = {
            guess: new Education(-1, 'sadf', 'yeet'),
            actual: undefined,
            educations: [],
        };
    }

    componentDidMount() {
        console.log(this.props.answers)
        questionManager.getRecommendations(this.props.answers).then((data: Education[]) => {
            console.log(data);
            this.setState({
                guess: data[0],
                actual: this.state.actual,
                educations: this.state.educations,
            })
        })
    }

    renderTitle(t: string) {
        return (
            <h1 className={'title'}> { t } </h1>
        )
    }

    renderGuess() {
        return (
            <div className={'primary-edu-block div-spacing'}>
                { resultPageCommon.renderEducationInfo(this.state.guess) }
                <hr/>
                { resultPageCommon.renderEducationTypes(this.state.guess.education_types) }
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('Vi tror din uddannelse er...')}
                </div>
                <div className={'row justify-content-center'}>
                    {this.state.guess ? this.renderGuess() : ''}
                </div>
            </div>
        )
    }
}

function Guess(answers: Answer[]) {
    return (
        <div className="App">
            <header className="App-header">
                <GuessPage answers={answers}/>
            </header>
        </div>
    );
}

export default Guess;