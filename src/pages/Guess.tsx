import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Translation} from "react-i18next";
import {Education, questionManager, Answer} from '../services/QuestionManager';
import {resultPageCommon} from "./commons/ResultPageCommon";
import SearchField from "./commons/SearchField"
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IGuessState {
    answers: Answer[];
    guess: Education;
}

class GuessPage extends React.Component<RouteComponentProps, IGuessState> {

    constructor(props:any) {
        super(props);

        this.state = {
            answers: this.props.location.state as Answer[],
            guess: new Education(-1, 'sadf', 'yeet')
        };
    }

    componentDidMount() {
        questionManager.getRecommendations(this.state.answers).then((data: Education[]) => {
            this.setState({
                guess: data[0]
            })
        })
    }

    logData = (edu: Education) => {
        questionManager.sendGuessData(this.state.answers, edu);
        this.props.history.push("/thanks", undefined);
    }

    renderTitle(text_key: string) {
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

    renderGuess() {
        return (
            <div className={'primary-edu-block div-spacing'}>
                { resultPageCommon.renderEducationInfo(this.state.guess) }
                <hr/>
                { resultPageCommon.renderEducationTypes(this.state.guess.education_types) }
            </div>
        )
    }

    renderYesButton() {
        return this.renderButton(
            'guess.yes_btn',
            () => {
                this.logData(this.state.guess)
            }
        )
    }

    renderNoButton() {
        return this.renderButton(
            'guess.no_btn',
            () => {
                ReactDOM.render(
                    <React.StrictMode>
                        <SearchField logCallback={this.logData}/>
                    </React.StrictMode>,
                    document.getElementById('search-field')
                )
            }
        )
    }

    renderButton(text_key: string, callback: () => void) {
        return (
            <button onClick={callback} className={'btn btn-primary next-btn edu-btn div-spacing'}>
                <Translation>
                    {
                        t => <span>{t(text_key)}</span>
                    }
                </Translation>
            </button>
        )
    }

    render() {
        return (
            <div>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('guess.guess_title')}
                </div>
                <div className={'row justify-content-center'}>
                    {this.state.guess ? this.renderGuess() : ''}
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('guess.is_correct_title')}
                </div>
                <div className={'row justify-content-center'}>
                    <div className={'col-4'}>{this.renderYesButton()}</div>
                    <div className={'col-4'}>{this.renderNoButton()}</div>
                </div>
                <div id={'search-field'}></div>
                <div id={'education-selector'}></div>
            </div>
        )
    }
}

export default withRouter(GuessPage);