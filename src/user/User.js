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
    }, 30000);
  }

  getCoords() {
    fetch("https://tow-truck-spring.herokuapp.com/getData")
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

          <div className="card-header p-1">Эвакуатор</div>

          {this.state.latitude === 0 &&
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-secondary m-5 p-5" role="status"><span className="sr-only">Loading...</span></div>
            </div>
          } 

          {this.state.latitude !== 0 &&
            <div className="media">
              <YMaps>
                <Map 
                  defaultState={{ center: [this.state.latitude, this.state.longitude], zoom: cfg.map.zoom }} 
                  width={ window.innerWidth }
                  height={ window.innerHeight * 0.85 }
                >
                  <Placemark 
                      modules={['geoObject.addon.balloon']}
                      geometry={ [ this.state.latitude, this.state.longitude ] }
                      options={{ preset: 'islands#dotIcon', iconColor: 'green' }}
                      properties={{
                        iconCaption:
                          'Сейчас находится здесь',
                      }}
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
                </Map>
              </YMaps>
            </div>
          }

            <div className="card-body p-1">
              0 (916) 000-00-00
            </div>

            <div className="card-footer text-muted" style={{'lineHeight': 0 + 'px'}}> 
              <font size="3">by <a className="text-muted" href="https://vk.com/shelepukhin">nVinz</a></font> 
            </div>
        </div>

      </div>
    );
  }
}

export default User;