import React from 'react';
import logo from '../img/breen.jpg';
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
            {this.renderButton('index.data_collection', "/datacollection/")}
          </div>
        </div>
    )
  }
}

export default withRouter(Index);
