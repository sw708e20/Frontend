import React from 'react';
import ReactDOM from 'react-dom';
import './i18n/i18n';
import Index  from './pages/HomePage';
import * as serviceWorker from './services/serviceWorker';
import { Route, Switch , BrowserRouter as Router} from 'react-router-dom'
import Recommender from './pages/Recommender';
import DataCollection from './pages/DataCollection';
import Thanks from './pages/Thanks'
import NavbarComponent from "./pages/commons/Navbar";
import './styling/style.scss'


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
        <Route exact path="/datacollection/">
          <DataCollection />
        </Route>
        <Route exact path="/thanks/">
          <Thanks />
        </Route>
      </Switch>
    </Router>
  )
}

ReactDOM.render(
        [
        <NavbarComponent />,
        <Routes />
        ],
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default Routes