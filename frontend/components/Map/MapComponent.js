import React from 'react'
import {connect} from 'react-redux';
import { compose, withProps, withStateHandlers, lifecycle, withHandlers } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import Actions from '../../common/actions';
import ServiceMarker from './ServiceMarker';
import InfoMarker from './InfoMarker';
import fetch from 'utils/fetch';

let mapRef = null;

const spec = {
  componentDidMount() {
    let pos;
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setState({
        pos,
        currentCenter: pos
      });
      
      fetch(`/api/service/${pos.lat}/${pos.lng}/100000`,{
        headers: {
          'Authorization':window.localStorage.accessToken
        }
      }).then(res=>res.json())
        .then(data=>{
          this.setState({
            services:data
          })
          this.props.saveNearServices(data)
        })
    })
  }
};

const renderMarkers = ({services})=> {
  if(services)
    return services.map(
      service => (
        <ServiceMarker key={service._id} service={service}/>
      )
    );
  return null;
}

const Map = compose(
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
      onMapClick: () => (latLng) => ({
        clickedPos: {
          lat: latLng.lat(),
          lng: latLng.lng()
        }
      }),
      changeCurrentCenter: () => (position) => ({
        currentCenter: position
      })
    }
  ),
  withHandlers(() => {
    const refs = {
      map: undefined,
    }

    return {
      onMapMounted: () => ref => {
        refs.map = ref
      },
      onChangeCenter: () => ({changeCurrentCenter}) => {
        changeCurrentCenter(refs.map.getCenter())
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>{

  console.log(props)
  return (
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={12}
      center={props.currentCenter ? props.currentCenter : { lat: -34.397, lng: 150.644 }}
      onDragEnd={() => props.onChangeCenter(props)}
      onClick={({latLng, set}) => props.setChosenPosition({
          lat: latLng.lat(),
          lng: latLng.lng()
        })
      }
    >
      {props.pos && <Marker position={props.pos} icon="http://www.davidstanleychevrolet.com/assets/d499/img/header-icon-direction.png"/>}
      {props.chosenPosition && <InfoMarker position={props.chosenPosition} label="+" windowContent={(
        <div>
          <a href="#form" className="modal-trigger">New Request</a>
        </div>
      )}/>}
      {renderMarkers(props)}
    </GoogleMap>
  )
}
  
);

const mapDispatchToProps = (dispatch) => {
  return {
    saveNearServices: (nearServices) => {
      dispatch(Actions.saveNearServices(nearServices));
    },
    setChosenPosition: (position) => {
      dispatch(Actions.setChosenPosition(position))
    }
  }
};

const mapStateToProps = (state) => {
  return {
    nearServices: state.nearServices,
    chosenPosition: state.chosenPosition
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);


// lat: 60.220877, lng: 24.805051