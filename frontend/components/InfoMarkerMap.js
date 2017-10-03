/**
 * Created by aelittaezugbaa on 02/10/2017.
 */
import React from 'react';

export default class InfoMarkerMap extends React.Component{

  render(){
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.props.lat, this.props.lon),
      map: this.props.map
    });
    let content='<div>'+this.props.desc+'</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    marker.addListener('click', function() {
      infoWindow.open(this.props.map, marker);
    });
    return(
        <div>{marker}</div>
    )
  }
}