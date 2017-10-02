import React from 'react';
import Input from './Input';
import MenuSide from './MenuSide/MenuSide';
import IconButton from './IconButton';
import Logo from './Logo';
import RegistrationModal from './RegistrationModal';
import {connect} from 'react-redux';

class Header extends React.Component {

  componentDidMount() {
    $('.main_menu_button').sideNav({
      edge: 'left',
      draggable: true,
    });
    $('.list_button').sideNav({
      edge: 'right',
      draggable: true,
    });
    $('.filter_button').sideNav({
      edge: 'right',
      draggable: true,
    });
    $('.modal').modal();
  }

  render() {
    let user = this.props.currentUser;
    return (
      <div className="header-container ">
        <div className="navbar nav-wrapper header">
          <div className="header__menu-button">
            <RegistrationModal/>
            <MenuSide
              id={user ? 'main_menu' : 'log_in'}
              name={user ? user.FullName : ''}
              email={user ? user.Email : ''}
            />
            <IconButton
              classNameA="navbar-brand button-collapse main_menu_button show-on-large"
              menu={user ? 'main_menu' : 'log_in'}
              classNameI="fa-bars fa-lg"
            />
          </div>
          <div className="header__tabs">
            {
              this.props.tabs
            }
          </div>
          <div className="header__search">
            <Input className="header__search__input"/>
          </div>
          <div className="header__action-buttons">
            {
              this.props.actionButtons
            }
          </div>
          <div className="header__logo">
            <Logo name="Jobber" href="/"/>
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    openTab: state.openTab,
    currentUser: state.user,
  }
};


export default connect(
  mapStateToProps,
)(Header);