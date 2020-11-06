import React from 'react';
import logo from '../img/logo-header-med.png';
import '../styling/HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouteComponentProps, withRouter } from "react-router"
import { Translation } from "react-i18next";

interface IIndexState {
  x:string
}

class Index extends React.Component<RouteComponentProps, IIndexState> {
  renderButton(text_key: string, routeTo: string) {
    return (
      <button className={"btn btn-primary edu-btn next-btn"} onClick={() =>
        {
          const { history } = this.props;
            history.push("/quiz/", {routeTo: routeTo, state: {routeTo: routeTo, answers: [], question: undefined}})
          }}>
          <Translation>
              {
                  t => <span>{t(text_key)}</span>
              }
          </Translation>
      </button>
    )
  }

  renderLogo() {
      return (
          <img alt={'EduFinder'} className={'header-logo'} src={logo}/>
      )
  }

  render() {
    return (
        <div>
            <div className={'row justify-content-center div-spacing'}>
              {this.renderLogo()}
            </div>
            <div className={'row justify-content-center div-spacing'}>
              {this.renderButton('index.rec_btn', "/results/")}
            </div>
            <div className={'row justify-content-center div-spacing'}>
              {this.renderButton('index.guess_btn', "/guess/")}
            </div>
        </div>
    )
  }
}

export default withRouter(Index);
