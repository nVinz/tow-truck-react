import React from 'react';
import { YMaps, Map, Placemark, Circle, TrafficControl, ZoomControl, FullscreenControl, GeolocationControl } from 'react-yandex-maps';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

class User extends React.Component {
  
  state = {
    latitude: 0,
    longtitude: 0
  };

  componentDidMount() {
    this.getCoords();
    this.interval = setInterval(() => {
      this.getCoords();
    }, 5000);
  }

  getCoords() {
    fetch("http://127.0.0.1:8080/getData")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          latitude: res.latitude,
          longitude: res.longtitude
        });
      });
  }

  render() {
    var cfg = require('../data/cfg.json');
    
    return (
      <div className="container d-flex mh-100 mw-100 justify-content-center">
        <div className="card h-100">

          <div className="card-header">Эвакуатор</div>

          <div className="media">
            <YMaps>
              <Map 
                defaultState={{ center: [this.state.latitude, this.state.longitude], zoom: cfg.map.zoom }} 
                width={ window.innerWidth }
                height={ window.innerHeight * 0.8 }
              >
                <Placemark 
                    geometry={ [ this.state.latitude, this.state.longitude ] }
                    options={{ preset: 'islands#dotIcon', iconColor: 'green' }}
                />
                <Circle 
                    options={{ fillColor: cfg.circle.color.fill + cfg.circle.color.fillAlpha, 
                          strokeColor: cfg.circle.color.stroke + cfg.circle.color.strokeAlpha,
                          fillOpacity: cfg.circle.fillOpacity, 
                          outline: true }}
                    geometry={ [ [this.state.latitude, this.state.longitude], cfg.circle.radius ] }
                />
                <TrafficControl />
                <ZoomControl />
                <FullscreenControl />
                <GeolocationControl />
              </Map>
            </YMaps>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">8-800-555-35-35</li>
          </ul>

        </div>

      </div>
    );
  }
}

export default User;