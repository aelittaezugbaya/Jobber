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

  componentDidMount(){
    this.getUserData();
  }

  getUserData(){
   fetch(`/api/user/${this.props.service.UserOwnerID}`,
      {
        headers: {
          'Authorization':window.localStorage.accessToken
        }
      })
      .then(res=>res.json())
      .then(data=>data[0])
      .then(data=>{

        this.setState({
          _id:data._id,
          name:data.FullName
        })
        console.log(this.state)
      })
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
            <div><h6>{service.Subject}</h6><br/>
              <strong>User: </strong><a href={`/user/${this.state._id}`}>{this.state.name}</a><br/>
              <strong>Category: </strong>{service.Category}<br/>
              <strong>Type: </strong>{service.IsRequest? 'Request':'Offer'}<br/>
              <strong>Description: </strong>{service.Description}<br/>
            </div>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}