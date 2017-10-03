import React from 'react';
import { Marker, InfoWindow } from "react-google-maps";

export default class InfoMarker extends React.Component {
  constructor(props){
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
    this.state = {
      isOpen: false
    }
  }

  onToggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {
      service
    } = this.props;


    return(
      <Marker
        position={{lat: service.Location.coordinates[1], lng: service.Location.coordinates[0]}}
        onClick={this.onToggleOpen}
      >
        { this.state.isOpen && (
          <InfoWindow onCloseClick={this.onToggleOpen}>
            <h4>{service.Category}</h4>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}