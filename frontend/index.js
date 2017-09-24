import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter,Switch, Route, Link } from 'react-router-dom'
import jobber from './common/reducers';
import UserPage from './components/UserPage'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/font-awesome/css/font-awesome.css';
import './index.css';
import '../node_modules/react-input-range/lib/css/index.css'
import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/materialize-css/dist/js/materialize.min';

let store = createStore(
  jobber,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import MainView from './components/MainView'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainView}/>
        <Route path="/user/:userId" component={UserPage}/>
      </Switch>
    </BrowserRouter>

  </Provider>,
  document.getElementById('root')
);
