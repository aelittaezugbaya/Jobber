/**
 * Created by aelittaezugbaa on 02/10/2017.
 */
import React from 'react'

export default class Map extends React.Component{

  constructor(props){
    super(props);
    this.googleChecker = this.googleChecker.bind(this);
    this.renderMap = this.renderMap.bind(this);
  }

  googleChecker() {
    if(!window.google) {
      setTimeout(this.googleChecker, 100);
      console.log("not there yet");
    } else {
      console.log("we're good to go!!");
      this.renderMap();
    }
  }

  renderMap(){
    const coords = { lat: 60.221061, lng: 24.805008 };
    let map, infoWindow;
    // create map instance
    map=new google.maps.Map(this.refs.mapContainer, {
      zoom: 16,
      center: coords
    });
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('I am here');
        infoWindow.open(map);
        map.setCenter(pos);
      }, ()=> {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    new google.maps.Marker({
      position: coords,
      map: map
    });
  }

  componentDidMount(){
    this.googleChecker();
  }

  render(){
    return(
      <div className="map-holder">
        <div className="" id = 'map' ref="mapContainer" />
      </div>
    );
  }
}
