import 'bootstrap/dist/css/bootstrap.min.css';
import React, {ReactElement, RefObject} from 'react';
import ReactDOM from 'react-dom';
import {Education, questionManager, Answer} from '../services/QuestionManager';
import SearchField from "./commons/SearchField";
import IndexPage from './HomePage';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IGuessState {
    answers: Answer[];
    guess: Education;
    inputValue: string;
}

class DataCollectionPage extends React.Component<RouteComponentProps, IGuessState> {

    constructor(props:any) {
        super(props);

        this.state = {
            answers: this.props.location.state as Answer[],
            guess: new Education(-1, 'sadf', 'yeet'),
            inputValue: ""
        };
    }

    componentDidMount() {
        questionManager.getRecommendations(this.state.answers).then((data: Education[]) => {
            this.setState({
                guess: data[0],
                inputValue: this.state.inputValue
            })
        })
    }

    logData = (edu: Education) => {
        questionManager.sendGuessData(this.state.answers, edu);
        this.props.history.push("/", undefined)
    }

    renderTitle(t: string) {
        return (
            <h1 className={'title'}> { t } </h1>
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
                <div id={'search-field'}>
                    <React.StrictMode>
                        <SearchField logCallback={this.logData}/>
                    </React.StrictMode>
                </div>
                <div id={'education-selector'}></div>
            </div>
        )
    }
}

export default withRouter(DataCollectionPage);