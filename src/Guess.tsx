import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-fontawesome';
import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {Education, questionManager, Answer} from './QuestionManager';
import {resultPageCommon} from "./ResultPageCommon";

interface IGuessProps {
    answers: Answer[];
}

interface IGuessState {
    guess: Education;
    inputValue: string;
}

interface ISelectorProps {
    searchTerm: string;
}

interface ISelectorState {
    educations: Education[];
    loading: boolean;
}

interface ISearchProps {

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

    renderYesButton() {
        return this.renderButton(
            'Ja',
            () => {
                questionManager.sendGuessData(this.props.answers, this.state.guess)
            }
        )
    }

    renderNoButton() {
        return this.renderButton(
            'Nej',
            () => {
                ReactDOM.render(
                    <React.StrictMode>
                        <SearchField />
                    </React.StrictMode>,
                    document.getElementById('search-field')
                )
            }
        )
    }

    renderButton(t: string, callback: () => void) {
        return (
            <button onClick={callback} className={'btn btn-primary next-btn edu-btn div-spacing'}> { t } </button>
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
                <hr/>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('Er dette korrekt?')}
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

    constructor(props:any) {
        super(props);

        this.state = {
            searchTerm: ''
        }
    }

    updateSearchTerm = (event: any) => {
        console.log(event.target.value)
        this.setState({
            searchTerm: event.target.value
        })
    }

    renderTitle() {
        return (
            <h1 className={'title'}> Angiv venligst din egentlige uddannelse </h1>
        )
    }

    renderSearchField() {
        return (
            <div className={'row justify-content-center'}>
                <div className={'col-10'}>
                    <input type={'text'} placeholder={'Søg'} className={'full-width'} value={this.state.searchTerm} onChange={this.updateSearchTerm} />
                </div>
                <div className={'col-2'}>
                    {this.renderSearchButton()}
                </div>
            </div>
        )
    }

    renderSearchButton() {
        return (
            <button onClick={() => {
                ReactDOM.render(
                    <React.StrictMode>
                        <EducationSelector searchTerm={this.state.searchTerm}/>
                    </React.StrictMode>,
                    document.getElementById('education-selector')
                )}} className={'btn btn-primary search-btn edu-btn div-spacing'}> Søg </button>
        )
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
        };
    }

    componentDidMount() {
        questionManager.getEducations(this.props.searchTerm).then((data: Education[]) => {
            console.log(data);
            this.setState({
                educations: data,
                loading: false
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
                    <p className={'title'}> Vi fandt desværre ikke nogen resultater </p>
                </div>
            )
        } else {
            for (let i = 0; i < education_count; i++) {
                elems.push(
                    <div className={'row justify-content-center'}>
                        <p className={'title'}> {this.state.educations[i].name} </p>
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
            <GuessPage answers={answers}/>
        </div>
    );
}

export default Guess;