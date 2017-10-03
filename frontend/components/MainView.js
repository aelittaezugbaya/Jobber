import React from 'react';
import {connect} from 'react-redux'
import Header from './Header'
import Tabs from './Tabs';
import FilterButtons from './FilterButtons';
import Map from './Map'


const background ={
  position: 'fixed',
  width: '100%',
  zIndex: '-1'
};

class MainView extends React.Component{


    render() {
      return(
        <div className="main-view">
          <Header
            tabs={
              <Tabs className="tabs-style tabs-fixed-width" tabs={['Buying', 'Selling']}/>
            }
            actionButtons={
              <FilterButtons/>
            }
          />
          <Map/>

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
