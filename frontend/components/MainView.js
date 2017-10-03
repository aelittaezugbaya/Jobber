import React from 'react';
import {connect} from 'react-redux'
import Header from './Header'
import Tabs from './Tabs';
import FilterButtons from './FilterButtons';
import {Map} from './MapComponent'


const background ={
  position: 'fixed',
  width: '100%',
  zIndex: '-1'
};

let data = [
  {
    'title' : "marker1",
    'latitude' : "21.883851754",
    'longitude' : "-159.465845879"
  },
  {
    'title' : "marker2",
    'latitude' : "22.1640990399",
    'longitude' : "-159.310355405"
  },
  {
    'title' : "marker3",
    'latitude' : "22.0855947129",
    'longitude' : "-159.344410728"
  }
];

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
          <Map isMarkerShown
               googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDY28-8DfcxGFrxCp-qumpzaWz0ot1uG0&v=3.exp&libraries=geometry,drawing,places"
               loadingElement={<div className="preHold" style={{ height: `100%` }} />}
               containerElement={<div className="map-holder"/>}
               mapElement={<div id="map"/>}/>
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
