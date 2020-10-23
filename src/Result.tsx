import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
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
    renderTitle() {
        return (
            <h1 className={'title'}> {'Recommended educations 4 u'} </h1>
        )
    }

    renderEducations() {
        const elems:React.ReactElement[] = [];

        for (let edu2 of this.state.list) {
            const eduTypes:React.ReactElement[] = [];
            let edu:Education = edu2;

            for (let eduType of edu.education_types) {
                eduTypes.push(
                    <div key={eduType.id} className={'row justify-content-center'}>
                        <div className={'col-6'}><p> {eduType.name} </p></div>
                        <div className={'col-6'}><a href={eduType.url}> Link to www.ug.dk </a></div>
                    </div>
                )
            }

            elems.push(
                <div className={'edu-block div-spacing'}>
                    <div className={'row justify-content-center'}>
                        <h3 className={'education-header'}> {edu.name} </h3>
                    </div>
                    <hr/>
                    <div className={'row justify-content-center'}>
                        <div className={'col-10'}> {edu.description} </div>
                    </div>
                    <hr/>
                    {eduTypes}
                </div>
            )
        }
        console.log(elems);
        return (
            <div> {elems} </div>
        )
    }

    render() {
        this.getEducations();
        return (
            <div>
                <div className={'row justify-content-center'}>
                    {this.renderTitle()}
                </div>
                <div className={'row justify-content-center'}>
                    {this.state.loading ? '' : this.renderEducations()}
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