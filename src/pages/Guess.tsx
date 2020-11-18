import React from 'react';
import ReactDOM from 'react-dom';
import {Translation} from "react-i18next";
import {Education, questionManager, Answer} from '../services/QuestionManager';
import {resultPageCommon} from "./commons/ResultPageCommon";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SearchField from "./commons/SearchField"

interface IGuessState {
    answers: Answer[];
    guess: Education;
    show_dialog: boolean;
}

class GuessPage extends React.Component<RouteComponentProps, IGuessState> {

    constructor(props:any) {
        super(props);

        this.state = {
            answers: this.props.location.state as Answer[],
            guess: new Education(-1, 'Loading', 'Loading'),
            show_dialog: true,
        };
    }

    componentDidMount() {
        questionManager.getRecommendations(this.state.answers).then((data: Education[]) => {
            this.setState({
                answers: this.state.answers,
                guess: data[0],
            })
        })
    }

    logData = (edu: Education) => {
        questionManager.sendGuessData(this.state.answers, edu);
        this.props.history.push("/thanks", undefined);
    }

    renderTitle(text_key: string, htmlId: string) {
        return (
            <h1 className={'title'} id={htmlId}>
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
            <div className={'row justify-content-center'}>
                <div className={'col-lg-6'}>
                    <div className={'card text-center bg-info'}>
                        { resultPageCommon.renderEducationInfo(this.state.guess) }
                        { resultPageCommon.renderEducationTypes(this.state.guess.education_types) }
                    </div>
                </div>
            </div>
        )
    }

    renderYesButton() {
        return this.renderButton(
            'guess.yes_btn',
            () => {
                this.logData(this.state.guess)
            },
            'yes-btn'
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
                this.setState({
                    show_dialog: false,
                })
            },
            'no-btn'
        )
    }

    renderButton(text_key: string, callback: () => void, htmlId: string) {
        return (
            <button onClick={callback} className={'btn btn-secondary btn-block'} id={htmlId}>
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
            <div className='d-flex flex-column'>
                <div className='d-flex justify-content-center text-center'>
                    {this.renderTitle('guess.guess_title', '1')}
                </div>

                {this.state.guess ? this.renderGuess() : ''}
                <div className='d-flex justify-content-center text-center'>
                    {this.renderTitle('guess.is_correct_title', '2')}
                </div>
                <div className={'row justify-content-center'}>
                    <div className={'col-5 col-md-2'}>{this.renderYesButton()}</div>
                    <div className={'col-5 col-md-2'}>{this.renderNoButton()}</div>
                </div>
                <div id={'search-field'} className={''}></div>
                <div id={'education-selector'}></div>
            </div>
        )
    }
}

export default withRouter(GuessPage);