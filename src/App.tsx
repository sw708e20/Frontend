import React from 'react';
import logo from './img/breen.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import Recommender from "./Recommender";
import Result from './Result'
import Guess from './Guess'
import { Answer } from './QuestionManager'
import { Translation } from "react-i18next";
import {resultPageCommon} from "./ResultPageCommon";

class Index extends React.Component {

  renderButton(text_key: string, callback: (answers: Answer[]) => void) {
    return (
        <button className={"btn btn-primary edu-btn next-btn"} onClick={() =>
          ReactDOM.render(
            <React.StrictMode>
                {Recommender(callback)}
            </React.StrictMode>,
            document.getElementById('root')
        )
        }>
            <Translation>
                {
                    t => <span>{t(text_key)}</span>
                }
            </Translation>
        </button>
    )
  }

  returnToResults(results :Answer[]){
    
    ReactDOM.render(
      <React.StrictMode>
          {Result(results)}
      </React.StrictMode>,
      document.getElementById('root'))
  }

  returnToGuess(answers: Answer[]) {
      ReactDOM.render(
          <React.StrictMode>
              {Guess(answers)}
          </React.StrictMode>,
          document.getElementById('root'))
  }

  returnToMain(answers:Answer[]){
    
    ReactDOM.render(
      <React.StrictMode>
          <App />
      </React.StrictMode>,
      document.getElementById('root'))
  }

  renderTitle(text_key: string) {
    return (
        <Translation>
            {
                t => <h1> {t(text_key)} </h1>
            }
        </Translation>
    )
  }

  renderLogo() {
      return (
          <img alt={'EduFinder'} className={'App-logo'} src={logo}/>
      )
  }

  render() {
      return (
        <div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderLogo()}
          </div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderTitle('index.title')}
          </div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderButton('index.rec_btn', this.returnToResults)}
          </div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderButton('index.guess_btn', this.returnToGuess)}
          </div>
        </div>
    )
  }
}

function App() {
  return (
    <div className="App">
        {resultPageCommon.renderNavbar()}
      <header className="App-header">
          <Index/>
      </header>
    </div>
  );
}

export default App;
