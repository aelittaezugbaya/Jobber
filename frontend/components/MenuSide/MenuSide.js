/**
 * Created by aelittaezugbaa on 14/09/2017.
 */
import React from 'react';
import { connect } from 'react-redux';

import UserView from './contents/UserView';
import OfferList from './contents/OfferList';
import FilterList from './contents/FilterList';
import LoginForm from './contents/LoginForm';

class MenuSide extends React.Component{

    componentDidMount(){
        $(document).ready(function(){

            $('.modal').modal();
        });
    }

    render(){
        let content;
        const {
          id,
          name,
          email,
          offers
        } = this.props;

        switch(id) {
          case 'main_menu':
            content = (
              <UserView name={name} email={email}/>
            );
            break;
          case 'list_menu':
            content=(
              <OfferList offers={offers}/>
            );
            break;
          case 'filter_menu':
            content = (
              <FilterList/>
            );
            break;
          case 'log_in':
            content = (
              <LoginForm />
            )
            break;
          default:
            return null;
        }

        console.log(content)

        return(
          <ul id={id} className={`side-nav ${id==='filter_menu' ? 'right-aligned' : ''} `}>
            { content }
          </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};

export default connect(
    mapStateToProps,
)(MenuSide);
