/**
 * Created by aelittaezugbaa on 02/10/2017.
 */
import React from 'react'
import InfoMarkerMap from './InfoMarkerMap'
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

  setMarkers(map){
    console.log(this.props.markers)
    this.props.markers.forEach(function(marker) {
      <InfoMarkerMap lat={marker.latitude} lon={marker.longitude} desc={marker.title} map={map} />;
    }.bind(this));

  }

  renderMap(){
    const metropolia = { lat: 60.221061, lng: 24.805008 };
    let map, infoWindow;
    // create map instance
    map=new google.maps.Map(this.refs.mapContainer, {
      zoom: 16,
      center: metropolia
    });
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=> {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        let myLocation=new google.maps.Marker({
          position: pos,
          map: map,
          icon:'http://i.stack.imgur.com/orZ4x.png'
        });

        map.setCenter(pos);
      }, ()=> {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    this.setMarkers(map);
    let content='<h4>Metropolia</h4>';

    var infowindow = new google.maps.InfoWindow({
      content: content
    });
    let marker=new google.maps.Marker({
      position: metropolia,
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
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
