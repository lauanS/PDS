import React, { Component } from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';
import apiKey from '../../utils/apiKey';

export class MapContainer extends Component {
    render() {
      return (
        <Map 
            google={this.props.google} 
            zoom={14}>
        </Map>
      );
    }
  }

export default GoogleApiWrapper({
    apiKey: (apiKey())
})(MapContainer)