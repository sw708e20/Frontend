import 'bootstrap/dist/css/bootstrap.min.css';
import React, {ReactElement, RefObject} from 'react';
import ReactDOM from 'react-dom';
import {Translation} from "react-i18next";
import {Education, questionManager} from '../../services/QuestionManager';
import i18n, {getLang, setGuessChangeHandler} from '../../i18n/i18n'

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
    lang: string;
}

class SearchField extends React.Component<ISearchProps, ISearchState> {
    resultElement:RefObject<EducationSelector>;

    constructor(props:any) {
        super(props);
        this.resultElement = React.createRef();
        setGuessChangeHandler(this.updateLang)

        this.state = {
            searchTerm: '',
            lang: getLang()
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

    updateLang = (lang: string) => {
        this.setState({
            searchTerm: this.state.searchTerm,
            lang: lang
        })
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
                    <input type={'text'} placeholder={i18n.t('guess.search')} className={'full-width'} onKeyPress={this.handleKeyPress} value={this.state.searchTerm} onChange={this.updateSearchTerm} />
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
            <div>
                <div className={'container justify-content-center'}>
                    {this.state.loading ? '' : this.renderEducations()}
                </div>
            </div>
        )
    }
}

export default SearchField