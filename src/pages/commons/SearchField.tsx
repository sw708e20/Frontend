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
            <div className='d-flex justify-content-center text-center'>
                <h1 className={'title'}>
                <Translation>
                {
                    t => t('guess.feedback_title')
                }
                </Translation>
                </h1>
            </div>
        )
    }

    renderSearchField() {
        return (
            <div className={'row justify-content-center'}>
                <div className={'col-lg-6'}>
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder={i18n.t('guess.search')} aria-label="Recipient's username" aria-describedby="basic-addon2" onKeyPress={this.handleKeyPress} value={this.state.searchTerm} onChange={this.updateSearchTerm}/>
                        <div className="input-group-append">
                            {this.renderSearchButton()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderSearchButton() {
        return (
            <button onClick={() => { this.performSearch() }} className={'btn btn-secondary'}>
                <Translation>
                    {
                        t => t('guess.search')
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
        return ([
                this.renderTitle(),
                this.renderSearchField()]
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
            for (let education of this.state.educations) {
                elems.push(
                    <div className={'row justify-content-center'}>
                        <button onClick={() => this.props.logCallback(education)}
                            className={'btn btn-secondary mt-3'}>
                            {education.name}</button>
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