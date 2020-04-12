import "./index.css";

import React, { Component } from "react";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import appsettings from "appsettings.json";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        className="maps"
        // eslint-disable-next-line react/prop-types
        google={this.props.google}
        zoom={16}
        initialCenter={{ lat: -33.9555316, lng: 18.4653227 }}
      >
        <Marker
          title={"Rosebank, Cape Town"}
          position={{ lat: -33.9555316, lng: 18.4653227 }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: appsettings.MapsApiKey
})(MapContainer);
