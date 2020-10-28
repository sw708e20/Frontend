import 'bootstrap/dist/css/bootstrap.min.css';
import React, {ReactElement} from 'react';
import axios from "axios";

interface EducationType {
    readonly id: number;
    readonly education: number;
    readonly name: string;
    readonly url: string;
}

interface Education {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly education_types: EducationType[];
}

class ResultPage extends React.Component {
    state = {list: [], loading: true};

    async getEducations() {
        if (this.state.loading) {
            let res = await axios.post(`http://edufinder.dk/recommend/`,
                {this_should: 'be questions and answers'});
            let obj = res.data;
            this.setState({list: obj, loading: false});
        }
    }
    renderTitle(t: string) {
        return (
            <h1 className={'title'}> {t} </h1>
        )
    }

    renderPrimaryRecommendation() {
        const elems:React.ReactElement[] = [];
        const primary:Education = this.state.list[0];

        elems.push(
            <div className={'primary-edu-block div-spacing'}>
                { this.renderEducationInfo(primary) }
                <hr/>
                { this.renderEducationTypes(primary.education_types) }
            </div>
        )

        return (
            <div> { elems } </div>
        )
    }

    renderRemainingRecommendations() {
        const elems:React.ReactElement[] = [];

        for (let edu2 of this.state.list.slice(1, this.state.list.length)) {
            let edu:Education = edu2;

            elems.push(
                <div className={'edu-block div-spacing'}>
                    { this.renderEducationInfo(edu) }
                    <hr/>
                    { this.renderEducationTypes(edu.education_types) }
                </div>
            )
        }

        return (
            <div> {elems} </div>
        )
    }

    renderEducationInfo(edu: Education) {
        return (
            <div>
                <div className={'row justify-content-center'}>
                    <h3 className={'education-header'}> {edu.name} </h3>
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    <div className={'col-10'}> {edu.description} </div>
                </div>
            </div>
        )
    }

    renderEducationTypes(eduTypes: EducationType[]) {
        let elems: ReactElement[] = []

        for (let eduType of eduTypes) {
            elems.push(
                <div key={eduType.id} className={'row justify-content-center'}>
                    <div className={'col-6'}><p> {eduType.name} </p></div>
                    <div className={'col-6'}><a href={eduType.url}> Link to www.ug.dk </a></div>
                </div>
            )
        }

        return elems
    }

    render() {
        this.getEducations();
        return (
            <div>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('Anbefalet uddannelse')}
                </div>
                <div className={'row justify-content-center'}>
                    {this.state.loading ? '' : this.renderPrimaryRecommendation()}
                </div>
                <hr/>
                <div className={'row justify-content-center'}>
                    {this.renderTitle('Du vil måske også være interesseret i')}
                </div>
                <div className={'row justify-content-center'}>
                    {this.state.loading ? '' : this.renderRemainingRecommendations()}
                </div>
            </div>
        )
    }
}

function Result() {
    return (
        <div className="App">
            <header className="App-header">
                <ResultPage />
            </header>
        </div>
    );
}

export default Result;