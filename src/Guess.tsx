import 'bootstrap/dist/css/bootstrap.min.css';
import React, {ReactElement, RefObject} from 'react';
import ReactDOM from 'react-dom';
import {Education, questionManager, Answer} from './QuestionManager';
import {resultPageCommon} from "./ResultPageCommon";
import App from "./App";
import {getI18n, Translation} from "react-i18next";

interface IGuessProps {
    answers: Answer[];
}

interface IGuessState {
    guess: Education;
    inputValue: string;
}

interface ISelectorProps {
    searchTerm: string;
    logCallback: (edu: Education) => void;
}

interface ISelectorState {
    educations: Education[];
    loading: boolean;
    searchTerm: string;
}

interface ISearchProps {
    logCallback: (edu: Education) => void;
}

interface ISearchState {
    searchTerm: string;
}

class GuessPage extends React.Component<IGuessProps, IGuessState> {

    constructor(props:any) {
        super(props);

        this.state = {
            guess: new Education(-1, 'sadf', 'yeet'),
            inputValue: ""
        };
    }

    componentDidMount() {
        questionManager.getRecommendations(this.props.answers).then((data: Education[]) => {
            this.setState({
                guess: data[0],
                inputValue: this.state.inputValue
            })
        })
    }

    logData = (edu: Education) => {
        questionManager.sendGuessData(this.props.answers, edu);
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root'))
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

class SearchField extends React.Component<ISearchProps, ISearchState> {
    resultElement:RefObject<EducationSelector>;

    constructor(props:any) {
        super(props);
        this.resultElement = React.createRef();

        this.state = {
            searchTerm: ''
        }
    }

    updateSearchTerm = (event: any) => {
        this.setState({
            searchTerm: event.target.value
        })
    }

    handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            this.performSearch()
        }
    }

    renderTitle() {
        return (
            <h1 className={'title'}>
                <Translation>
                    {
                        t => <span>{t('guess.feedback_title')}</span>
                    }
                </Translation>
            </h1>
        )
    }

    renderSearchField() {
        return (
            <div className={'row justify-content-center'}>
                <div className={'col-10'}>
                    <input type={'text'} placeholder={getI18n().t('guess.search')} className={'full-width'} onKeyPress={this.handleKeyPress} value={this.state.searchTerm} onChange={this.updateSearchTerm} />
                </div>
                <div className={'col-2'}>
                    {this.renderSearchButton()}
                </div>
            </div>
        )
    }

    renderSearchButton() {
        return (
            <button onClick={() => {this.performSearch()}} className={'btn btn-primary search-btn edu-btn div-spacing'}>
                <Translation>
                    {
                        t => <span>{t('guess.search')}</span>
                    }
                </Translation>
            </button>
        )
    }

    performSearch() {
        if (this.resultElement.current) this.resultElement.current.updateSearchTerm(this.state.searchTerm);
        else
        ReactDOM.render(
            <React.StrictMode>
                <EducationSelector searchTerm={this.state.searchTerm} logCallback={this.props.logCallback} ref={this.resultElement}/>
            </React.StrictMode>,
            document.getElementById('education-selector'))
    }

    render() {
        return (
            <div>
                <hr/>
                {this.renderTitle()}
                {this.renderSearchField()}
            </div>
        );
    }
}

class EducationSelector extends React.Component<ISelectorProps, ISelectorState> {

    constructor(props:any) {
        super(props);

        this.state = {
            educations: [],
            loading: true,
            searchTerm: this.props.searchTerm
        };
    }

    componentDidMount() {
        this.getEducations(this.props.searchTerm)
    }

    updateSearchTerm(term: string) {
        this.setState({
            educations: this.state.educations,
            loading: true,
            searchTerm: term
        })
        this.getEducations(term)
    }

    getEducations(term: string) {
        questionManager.getEducations(term).then((data: Education[]) => {
            this.setState({
                educations: data,
                loading: false,
                searchTerm: this.state.searchTerm
            })
        })
    }

    renderEducations() {
        const elems:ReactElement[] = []
        const display_max = 10;
        let education_count = this.state.educations.length < display_max ? this.state.educations.length : display_max;

        if (education_count === 0) {
            elems.push(
                <div className={'row justify-content-center'}>
                    <Translation>
                        {
                            t => <p className={'title'}> {t('guess.search_error')} </p>
                        }
                    </Translation>
                </div>
            )
        } else {
            for (let i = 0; i < education_count; i++) {
                elems.push(
                    <div className={'row justify-content-center'}>
                        <button onClick={() => this.props.logCallback(this.state.educations[i])}
                                className={'btn btn-primary search-selector-btn edu-btn div-spacing'}>
                        {this.state.educations[i].name}</button>
                    </div>
                )
            }
        }

        return elems
    }

    render() {
        return (
            <div className={'container justify-content-center'}>
                {this.state.loading ? '' : this.renderEducations()}
            </div>
        )
    }
}

function Guess(answers: Answer[]) {
    return (
        <div className="App App-header">
            {resultPageCommon.renderNavbar()}
            <header className="App-header">
                <GuessPage answers={answers}/>
            </header>
        </div>
    );
}

export default Guess;