import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import apiKey from '../../utils/apiKey';

export default class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: -23.5532481,
      lng: -46.6402224
    },
    zoom: 14
  };

  render() {
    return (
      <div style={{ height: '100%', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: apiKey(),
            libraries: ['places'],
            language: 'pt-BR',
            region: 'BR'          
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}


          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => this.props.handleApiLoaded(map, maps)}
          
        >
          {this.props.children}
        </GoogleMapReact>
      </div>
    );
  }
}