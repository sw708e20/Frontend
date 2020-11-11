import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Education, questionManager, Answer} from '../services/QuestionManager';
import SearchField from "./commons/SearchField";
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IGuessState {
    answers: Answer[];
    guess: Education;
}

class DataCollectionPage extends React.Component<RouteComponentProps, IGuessState> {

    constructor(props:any) {
        super(props);

        this.state = {
            answers: this.props.location.state as Answer[],
            guess: new Education(-1, 'sadf', 'yeet')
        };
    }

    logData = (edu: Education) => {
        questionManager.sendGuessData(this.state.answers, edu);
        this.props.history.push("/thanks", undefined);
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