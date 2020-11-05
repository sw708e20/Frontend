import React from 'react';
import logo from '../img/breen.jpg';
import '../styling/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouteComponentProps, withRouter } from "react-router"

interface IIndexState {
  x:string
}

class Index extends React.Component<RouteComponentProps, IIndexState> {
  renderButton(text: string, routeTo: string) {
    return (
      <button className={"btn btn-primary edu-btn next-btn"} onClick={() =>
        {
          const { history } = this.props;
            history.push("/quiz/", {routeTo: routeTo, state: {routeTo: routeTo, answers: [], question: undefined}})
          }}> {text} </button>
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
            {this.renderButton('Uddannelsesforslag', "/results/")}
          </div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderButton('Udannelsesgætter', "/guess/")}
          </div>
          <div className={'row justify-content-center div-spacing'}>
            {this.renderButton('Dataindsamling', "/datacollection/")}
          </div>
        </div>
    )
  }
}

export default withRouter(Index);
