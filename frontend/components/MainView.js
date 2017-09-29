import React from 'react';
import Header from './Header'
import {connect} from 'react-redux'

const background ={
  position: 'fixed',
  width: '100%',
  zIndex: '-1'
};

class MainView extends React.Component{


    render() {
      return(
        <div>
          <Header/>

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
)(MainView);
