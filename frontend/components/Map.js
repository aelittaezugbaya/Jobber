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
    const coords = { lat: 41.375885, lng: 2.177813 };
    // create map instance
    new google.maps.Map(this.refs.mapContainer, {
      zoom: 16,
      center: coords
    });
  }

  componentDidMount(){
    this.googleChecker();
  }

  render(){
    return(
      <div className="card map-holder">
        <div className="" id = 'map' ref="mapContainer" />
      </div>
    );
  }
}
