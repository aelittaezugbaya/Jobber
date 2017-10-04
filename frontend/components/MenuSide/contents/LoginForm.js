import React from 'react';
import {withRouter} from 'react-router';
import jwt_decode from 'jwt-decode';
import {connect} from 'react-redux';
import Actions from '../../../common/actions/index';
import fetch from 'utils/fetch';

import Button from '../../Button';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
  }

  loginAPI(email, password) {
    const data = 'Email=' + encodeURIComponent(email) +
      '&Password=' + encodeURIComponent(password);

    fetch('/api/auth/login',
      {
        method: 'POST',
        body: data
      })
      .then(data => data.text())
      .then(data => {
        // let base64Url = data.split('.')[1];
        // let base64 = base64Url.replace('-', '+').replace('_', '/');
        // console.log(JSON.parse(window.atob(base64)))
        console.log(data)
        const user = jwt_decode(data);
        window.localStorage.accessToken = data;
        if (this.props.onSuccessfulLogin)
          this.props.onSuccessfulLogin(user);
      })
      .catch(err => console.log(err));

  }

  onLoginFormSubmit(ev) {
    ev.preventDefault();

    this.loginAPI(this.username.value, this.password.value)
  }

  render() {
    return (
      <form onSubmit={this.onLoginFormSubmit}>
        <h4 className="center">Log in</h4>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">account_circle</i>
            <input ref={ref => this.username = ref} id="user_name" type="text" className="validate"/>
            <label htmlFor="user_name">Username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">lock</i>
            <input ref={ref => this.password = ref} id="password" type="password" className="validate"/>
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="center">
          <Button className="btn waves-effect waves-light grey lighten-4 black-text" type="reset"
                  name="action">Cancel</Button>
          <Button className="btn waves-effect waves-light amber darken-1" type="submit" name="action">Log In</Button>

        </div>
        <p className="center">If you don't have an account,<br/> please <a className=" modal-trigger"
                                                                           href="#registration">register</a></p>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSuccessfulLogin: (user) => {
      dispatch(Actions.addCurrentUser(user));
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
