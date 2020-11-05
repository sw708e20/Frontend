import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import Index  from './pages/HomePage';
import * as serviceWorker from './services/serviceWorker';
import { Route, Switch , BrowserRouter as Router} from 'react-router-dom'
import Recommender from './pages/Recommender';
import Result from './pages/Result'
import Guess from './pages/Guess'
import DataCollection from './pages/DataCollection';


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/quiz/">
          <Recommender />
        </Route>
        <Route exact path="/results/">
          <Result />
        </Route>
        <Route exact path="/guess/">
          <Guess />
        </Route>
        <Route exact path="/datacollection/">
          <DataCollection />
        </Route>
      </Switch>
    </Router>

  )
}

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default Routes