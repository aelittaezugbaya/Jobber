/**
 * Created by aelittaezugbaa on 02/10/2017.
 */
import React from 'react'
import InfoMarkerMap from './InfoMarkerMap'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"




const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 60.220877, lng: 24.805051 }}
  >
     <Marker position={{ lat: 60.220877, lng: 24.805051 }} />
  </GoogleMap>
))
// Map.defaultProps={
//   center: {lat: 60.220877,  lng: 24.805051},
//   zoom: 11
// }
export{
  Map
}