import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

interface EducationType {
    readonly name: string;
    readonly url: string;
}

interface Education {
    readonly name: string;
    readonly description: string;
    readonly types: EducationType[];
}

class ResultPage extends React.Component {
    getEducations() {
        return (
            [
                {name: 'God uddannelse', description: 'den er bare nice',
                    types: [{name: 'bachelor', url: 'yeet.dk'}, {name: 'masters', url: 'yeet.dk'}]},
                {name: 'Rigtig god uddannelse', description: 'mere nice',
                    types: [{name: 'bachelor', url: 'yeet.dk'}, {name: 'masters', url: 'yeet.dk'}]},
                {name: 'Et eller andet humaniora', description: ':nauseous:',
                    types: [{name: 'EUD', url: ':nauseous:.dk'}]}
            ]
        )
    }

    renderTitle() {
        return (
            <h1> {'Recommended educations 4 u'} </h1>
        )
    }

    renderEducations() {
        const elems:React.ReactElement[] = [];

        for (let edu of this.getEducations()) {
            const eduTypes:React.ReactElement[] = [];

            for (let eduType of edu.types) {
                eduTypes.push(
                    <div className={'row justify-content-center'}>
                        <div className={'col-4'}> {eduType.name} </div>
                        <div className={'col-8'}><a href={eduType.url}> {eduType.url} </a></div>
                    </div>
                )
            }

            elems.push(
                <div className={'edu-block div-spacing'}>
                    <div className={'row justify-content-center'}>
                        <h3 className={'education-header'}> {edu.name} </h3>
                    </div>
                    <div className={'row justify-content-center'}>
                        <p> {edu.description} </p>
                    </div>
                    {eduTypes}
                </div>
            )
        }

        return (
            <div> {elems} </div>
        )
    }

    render() {
        return (
            <div>
                <div className={'row'}>
                    {this.renderTitle()}
                </div>
                <div className={'row justify-content-center'}>
                    {this.renderEducations()}
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