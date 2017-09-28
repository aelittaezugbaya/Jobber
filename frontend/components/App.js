import React from 'react';
import Actions from '../common/actions';
import jwt_decode from 'jwt-decode';
import {connect } from 'react-redux';
import UserPage from './UserPage';
import MainView from './MainView';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  componentWillMount(){
    if(window.localStorage.accessToken !== undefined) {
      this.props.initUser(window.localStorage.accessToken)
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainView}/>
        <Route path="/user/:id" component={UserPage}/>
      </Switch>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initUser: (token) => {
      let user = jwt_decode(token);
      dispatch(Actions.addCurrentUser(user));
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(App);