import React from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import fetch from 'utils/fetch';

export default class InfoMarker extends React.Component {
  constructor(props){
    super(props);
    this.onToggleOpen = this.onToggleOpen.bind(this);
    this.state = {
      isOpen: false
    }
  }

  get markerPosition() {
    return this.props.position;
  }

  getInfoWindowContent() {
    return this.props.windowContent;
  }

  onToggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const {
      service,
      icon,
      label
    } = this.props;


    return(
      <Marker
        position={this.markerPosition}
        onClick={this.onToggleOpen}
        icon={icon}
        label={label}
      >
        { this.state.isOpen && (
          <InfoWindow onCloseClick={this.onToggleOpen}>
            {this.getInfoWindowContent()}
          </InfoWindow>
        )}
      </Marker>
    )
  }
}