import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {resultPageCommon} from './ResultPageCommon'
import { questionManager, Answer, Education} from "./QuestionManager";
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface IRecommenderState {
    answers: Answer[]
    loading: boolean
    list : Education[]
}

class ResultPage extends React.Component<RouteComponentProps, IRecommenderState> {

    constructor(props:any) {
        super(props);
        
        this.state = {answers: this.props.location.state as Answer[] ,loading: true, list: []};
    }

    componentDidMount(){
        this.getEducations()
        this.setState({loading: true, list: this.state.list})
    }

    getEducations() {
        questionManager.getRecommendations(this.state.answers).then((res)=>{
            this.setState({loading: false, list: res})
        })
        
        //this.setState({list: null, loading: false});
        
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
                { resultPageCommon.renderEducationInfo(primary) }
                <hr/>
                { resultPageCommon.renderEducationTypes(primary.education_types) }
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
                    { resultPageCommon.renderEducationInfo(edu) }
                    <hr/>
                    { resultPageCommon.renderEducationTypes(edu.education_types) }
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

export default withRouter(ResultPage);