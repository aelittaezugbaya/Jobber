import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/font-awesome/css/font-awesome.css';
import './index.css';

import '../node_modules/jquery/dist/jquery.min';
import '../node_modules/materialize-css/dist/js/materialize.min';


import MainView from './MainView'

ReactDOM.render(
  <MainView/>,
  document.getElementById('root')
);
