import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import apiKey from '../../utils/apiKey';

export default class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100%', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey()}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.children}
        </GoogleMapReact>
      </div>
    );
  }
}