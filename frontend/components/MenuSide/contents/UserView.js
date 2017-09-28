import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Actions from '../../../common/actions/index';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(){
    delete window.localStorage.accessToken;
    if(this.props.onLogout)
      this.props.onLogout();
  };

  render() {
    const {
      FullName,
      Email,
      _id
    } = this.props.currentUser;
    console.log(this.props)
    return(
      <div>
        <li>
          <div className="user-view">
            <div className="background">
              <img src="/assets/img/background.jpg"/>
            </div>
            <a href="" onClick={() => this.props.history.push(`/user/${_id}`)}><img className="circle" src="/assets/img/avatar.jpg"/></a>
            <a href="#!name"><span className="white-text name">{FullName}</span></a>
            <a href="#!email"><span className="white-text email">{Email}</span></a>
          </div>
        </li>

        <li><a className="waves-effect" href="#!">Add new offer</a></li>
        <li><div className="divider"></div></li>
        <li><a className="waves-effect" href="#!">Add new request</a></li>
        <li><div className="divider"></div></li>
        <li><a className="waves-effect" href="#!">Saved Request/Offers</a></li>
        <li><div className="divider"></div></li>
        <li className="log_out"><a className="waves-effect" onClick={this.logout} href="#!">Log out</a><div className="divider"></div></li>

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(Actions.logout())
    }
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView));
