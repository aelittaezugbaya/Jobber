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

      // -- This is placeholder images for the map
      let image = "/assets/img/map_selling.png";

      if(this.props.openTab === 'Buying'){
        image = "/assets/img/map_buying.png";
      }

      return(
        <div>
          <Header/>
          <img src={image} style={background}></img>
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
