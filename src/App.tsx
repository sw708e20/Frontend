import React from 'react';
import logo from './img/breen.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import Recommender from "./Recommender";

class Index extends React.Component {
  renderButton(text: string) {
    return (
        <button className={"btn btn-primary edu-btn next-btn"} onClick={() =>
          ReactDOM.render(
            <React.StrictMode>
                <Recommender />
            </React.StrictMode>,
            document.getElementById('root')
        )
        }> {text} </button>
    )
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
            {this.renderButton('Begin')}
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
