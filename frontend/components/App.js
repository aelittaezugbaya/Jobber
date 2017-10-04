import React from 'react';
import Actions from '../common/actions';
import jwt_decode from 'jwt-decode';
import {connect } from 'react-redux';
import { withRouter } from 'react-router';
import fetch from 'utils/fetch'
import UserPage from './UserPage/UserPage';
import MainView from './MainView';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  componentWillMount(){
    const token = window.localStorage.accessToken;
    const currentDate = new Date().getTime().toString().substring(0, 10);

    if(token !== undefined) {
      if(jwt_decode(token).exp > currentDate)
       return this.props.initUser(token);
    }

    this.props.history.push('/');
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainView}/>
        <Route exact path="/user/:id" component={UserPage}/>
      </Switch>
    )
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    initUser: (token) => {
      let user = jwt_decode(token);
      fetch(`/api/user/${user._id}`,
      {
        headers: {
          'Authorization':window.localStorage.accessToken
        }
      })
      .then(res=>res.json())
      .then(data=>data[0])
      .then(data=>{
        const {
          FullName,
          Email,
          DateOfBirth,
          Gender,
          Rating,
          Description,
          _id
        } = data;
        dispatch(Actions.addCurrentUser(data));
      });
      

    }
  }
};

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App));