import React from 'react';
import InfoMarker from './InfoMarker';

export default class ServiceMarker extends InfoMarker {

  componentDidMount(){
    this.getUserData();
  }
  get markerPosition() {
    const {
      service
    } = this.props;
    return {
      lat: service.Location.coordinates[1],
      lng: service.Location.coordinates[0]
    }
  }
  getUserData(){
   fetch(`/api/user/${this.props.service.UserOwnerID}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          'Authorization':window.localStorage.accessToken,
          "Accept": "application/json"
        }
      })
      .then(res=>res.json())
      .then(data=>data[0])
      .then(data=>{
        this.setState({
          _id:data._id,
          name:data.FullName
        })

      })

  }

  getInfoWindowContent() {
    const {
      service
    } = this.props;
    return (
      <div>
        <h6>{service.Subject}</h6>
        <br />
        <strong>User:</strong>
        <a href={`/user/${this.state._id}`}>{this.state.name}</a>
        <br />
        <strong>Category:</strong>
        {service.Category}
        <br />
        <strong>Type: </strong>
        {service.IsRequest ? 'Request' : 'Offer'}
        <br />
        <strong>Description: </strong>
        {service.Description}
        <br />
      </div>
    );
  }
}