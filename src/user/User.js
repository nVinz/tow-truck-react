import React from 'react';
import { YMaps, Map, Placemark, Circle, TrafficControl, ZoomControl } from 'react-yandex-maps';
import 'bootstrap/dist/css/bootstrap.css';

class User extends React.Component {
  render() {
    var gps = require('../data/gps.json');
    var cfg = require('../data/cfg.json');

    return (
      <div className="User">

        My awesome application with maps!

        <YMaps>
          <div>
            <Map 
              defaultState={{ center: [gps.latitude, gps.longitude], zoom: cfg.map.zoom }} 
              width={ 800 }
              height={ 600 }
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

            </Map>
          </div>
        </YMaps>

        <div class="card">
            <img class="card-img-top" src="..." alt="Card image cap" />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>

      </div>
    );
  }
}

export default User;