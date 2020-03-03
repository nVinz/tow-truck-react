import React from 'react';
import { YMaps, Map, Placemark, Circle, TrafficControl, ZoomControl } from 'react-yandex-maps';
import { geolocated } from "react-geolocated";


class Admin extends React.Component {

  /*getGps = async (e) => {
    e.preventDefault();
    var geolocation = require('geolocation');

    var obj = {
      latitude: [],
      longitude: []
   };

    geolocation.getCurrentPosition(
      function (err, position) {
        if (err) throw err
        console.log(position);
        obj.latitude.push(position.latitude);
        console.log(obj);
      }
    ); 
  }*/
  getGps = async (e) => {
    e.preventDefault();

    //const write = require('write');
    //write.sync('../data/test.json', 'some data...', { overwrite: true });

    var FileSaver = require('file-saver');
    FileSaver.saveAs("123", "../data/test.json");
  }

  render() {
    //var gps = require('../data/gps.json');
    var cfg = require('../data/cfg.json');

    return !this.props.isGeolocationAvailable ? 
    (<div>Your browser does not support Geolocation</div>) : 
      !this.props.isGeolocationEnabled ? 
      (<div>Geolocation is not enabled</div>) : this.props.coords ? (
        <div className="Admin">
          <YMaps>
            <div>
              Admin panel

              <form onSubmit={this.getGps}>
                <button>Update Position</button>
              </form>
              
              <Map 
                defaultState={{ center: [this.props.coords.latitude, this.props.coords.longitude], zoom: cfg.map.zoom }} 
                width={800}
                height={600}
              >

                <Placemark 
                  geometry={ [ this.props.coords.latitude, this.props.coords.longitude ] }
                  dragend={{}}
                />

                <Circle 
                  options={{fillColor: cfg.circle.color.fill + cfg.circle.color.fillAlpha, 
                            strokeColor: cfg.circle.color.stroke + cfg.circle.color.strokeAlpha,
                            fillOpacity: cfg.circle.fillOpacity, 
                            outline: true }}
                  geometry={ [ [this.props.coords.latitude, this.props.coords.longitude], cfg.circle.radius] }
                />

                <TrafficControl />
                <ZoomControl />
              </Map>
            </div>
          </YMaps>
        </div>
      ) 
    : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

//export default Admin;
export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  watchPosition: true,
  userDecisionTimeout: 5000,
})(Admin);