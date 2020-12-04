import React from 'react';
import logo from '../img/logo-header-med.png';
import { RouteComponentProps, withRouter } from "react-router"
import { Translation } from "react-i18next";
import EventListener from "react-event-listener";
import Breen from "./commons/breen";
import '../styling/breen.css'

interface IIndexState {
  easterBreen: string;
  logo: string;
  data_collection: boolean;
}

class Index extends React.Component<RouteComponentProps, IIndexState> {
  constructor(props: any) {
    super(props);

    let data_collection: boolean = /\/data\/?/.exec(this.props.location.pathname) != null;

    this.state = {
      easterBreen: '',
      logo: logo,
      data_collection: data_collection
    }
  }

  renderButton(text_key: string, routeTo: string) {
    return (
      <button className={"btn btn-secondary edu-btn next-btn"} onClick={() => {
        const { history } = this.props;
        history.push("/quiz/", { routeTo: routeTo, state: { routeTo: routeTo, answers: [], question: undefined } })
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
      <img alt={'EduFinder'} className={'header-logo img-fluid '} src={this.state.logo}/>
    )
  }

  renderButtonSegment() {
    if (this.state.data_collection) {
      return (
        <div className={'d-flex justify-content-center mt-4'}>
          {this.renderButton('index.data_btn', "/datacollection/")}
        </div>
      )
    } else {
      return [
        <div className={'d-flex justify-content-center mt-4'}>
          {this.renderButton('index.rec_btn', "/results/")}
        </div>,
        <div className={'d-flex justify-content-center mt-4'}>
          {this.renderButton('index.guess_btn', "/guess/")}
        </div>
      ]
    }
  }

  setEasterBreen = (easterBreen: string) => {
    this.setState({
      easterBreen: easterBreen,
      logo: this.state.logo,
    })
  }

  detectEasterBreen = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      this.setEasterBreen('');
    } else if (this.state.easterBreen + e.key === 'breen' ||
               (this.state.easterBreen === 'breen' && e.key === 'n')) {
      Breen();
    } else {
      this.setEasterBreen(this.state.easterBreen + e.key);
    }
  }

  render() {
    return (
      <div className={'container-fluid d-flex flex-grow-1  align-items-center'}>
        <div className='d-flex flex-column flex-grow-1'>

        <EventListener target={"window"} onKeyPress={this.detectEasterBreen} />
        <div className={'d-flex justify-content-center'}>
          {this.renderLogo()}
        </div>
          {this.renderButtonSegment()}
        <div className={'breen-container'}></div>
        </div>
      </div>
    )
  }
}

export default withRouter(Index);
