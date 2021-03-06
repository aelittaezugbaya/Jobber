import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter,Switch, Route, Link } from 'react-router-dom';
import jobber from './common/reducers';
import App from './components/App';

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import './index.css';
import '../node_modules/react-input-range/lib/css/index.css'
import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/materialize-css/dist/js/materialize.min';

let store = createStore(
  jobber,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
