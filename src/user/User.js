import React from 'react';
import { YMaps, Map, Placemark, Circle, TrafficControl, ZoomControl, FullscreenControl, GeolocationControl } from 'react-yandex-maps';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

class User extends React.Component {
  render() {
    var gps = require('../data/gps.json');
    var cfg = require('../data/cfg.json');
        
    return (
      <div className="container d-flex mh-100 mw-100 justify-content-center">
        <div className="card h-100">

          <div className="card-header">Эвакуатор</div>

          <div className="media">
            <YMaps>
              <Map 
                defaultState={{ center: [gps.latitude, gps.longitude], zoom: cfg.map.zoom }} 
                width={ window.innerWidth }
                height={ window.innerHeight * 0.8 }
              >
                <Placemark 
                    geometry={ [ gps.latitude, gps.longitude ] }
                    options={{ preset: 'islands#dotIcon', iconColor: 'green' }}
                />
                <Circle 
                    options={{ fillColor: cfg.circle.color.fill + cfg.circle.color.fillAlpha, 
                          strokeColor: cfg.circle.color.stroke + cfg.circle.color.strokeAlpha,
                          fillOpacity: cfg.circle.fillOpacity, 
                          outline: true }}
                    geometry={ [ [gps.latitude, gps.longitude], cfg.circle.radius ] }
                />
                <TrafficControl />
                <ZoomControl />
                <FullscreenControl />
                <GeolocationControl />
              </Map>
            </YMaps>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item bg-light text-dark">8-800-555-35-35</li>
          </ul>

        </div>

      </div>
    );
  }
}

export default User;