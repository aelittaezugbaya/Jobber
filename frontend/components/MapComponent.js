/**
 * Created by aelittaezugbaa on 02/10/2017.
 */
import React from 'react'
import InfoMarkerMap from './InfoMarkerMap'
import {connect} from 'react-redux';
import { compose, withProps, withStateHandlers, lifecycle} from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Actions from '../common/actions';
import InfoMarker from './InfoMarker';
import fetch from 'utils/fetch';

const spec = {
  componentDidMount() {
    let pos;
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
      }
      this.setState({
        pos
      });
      console.log(pos)
      fetch(`/api/service/${pos.lat}/${pos.lon}/100000`,{
        headers: {
          'Authorization':window.localStorage.accessToken
        }
      }).then(res=>res.json())
        .then(data=>{
          this.setState({
            services:data
          })
          // this.props.saveNearServices(data)
        })
    })

    // // window.fetch(`/api/service/${pos.lat}/${pos.lan}/100000`,
    // //   {
    // //
    // //   }
    // );
  }
};

const renderMarkers = ({services})=> {
  if(services)
    return services.map(
      service => (
        <InfoMarker key={service._id} service={service}/>
      )
    );
  return null;
}

export const Map = compose(
  lifecycle(
    spec
  ),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={12}
    center={props.pos ? { lat: props.pos.lat,lng:props.pos.lon } : { lat: -34.397, lng: 150.644 }}
  >
    {props.pos && <Marker position={{ lat: props.pos.lat,lng:props.pos.lon }} icon="http://www.davidstanleychevrolet.com/assets/d499/img/header-icon-direction.png"/>}
    {renderMarkers(props)}
  </GoogleMap>
);

const mapDispatchToProps = (dispatch) => {
  return {
    saveNearServices: (nearServices) => {
      dispatch(Actions.saveNearServices(nearServices));
    }
  }
};

const mapStateToProps = (state) => {
  return {
    nearServices: state.nearServices
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withGoogleMap);


// lat: 60.220877, lng: 24.805051