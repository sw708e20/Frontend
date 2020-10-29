import React from 'react';
import logo from './img/breen.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import Recommender from "./Recommender";
import Result from './Result'
import { Answer } from './QuestionManager'

class Index extends React.Component {
  renderButton(text: string, callback: (answers: Answer[]) => void) {
    return (
        <button className={"btn btn-primary edu-btn next-btn"} onClick={() =>
          ReactDOM.render(
            <React.StrictMode>
                {Recommender(callback)}
            </React.StrictMode>,
            document.getElementById('root')
        )
        }> {text} </button>
    )
  }

  returnToResults(answers:Answer[]){
    
    ReactDOM.render(
      <React.StrictMode>
          <Result />
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

  renderTitle(text: string) {
    return (
        <h1> {text} </h1>
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
            {this.renderTitle('EduFinder')}
          </div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderButton('Uddannelses forslag', this.returnToResults)}
          </div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderButton('Udannelse gætter', this.returnToMain)}
          </div>
        </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Index/>
      </header>
    </div>
  );
}

export default App;
