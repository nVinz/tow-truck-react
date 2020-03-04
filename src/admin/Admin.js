import React from 'react';
import { YMaps, Map, Placemark, Circle, TrafficControl, ZoomControl, FullscreenControl } from 'react-yandex-maps';
import { geolocated } from "react-geolocated";
import '../App.css';
import Default from '../default/Default';
import NoGps from '../nogps/NoGps';

class Admin extends React.Component {

  getGps = async (e) => {
    e.preventDefault();
    console.log("drag end");
  }

  render() {
    //var gps = require('../data/gps.json');
    var cfg = require('../data/cfg.json');

    return !this.props.isGeolocationAvailable ? 
    (<NoGps />) : 
      !this.props.isGeolocationEnabled ? 
      (<NoGps />) : this.props.coords ? (

        <div class="container d-flex h-100 w-100 justify-content-center">
          <div class="card h-100 text-white bg-secondary">

            <div class="card-header">Админ-панель</div>

            <div class="media">
              <YMaps>
                <Map 
                  defaultState={{ center: [this.props.coords.latitude, this.props.coords.longitude], zoom: cfg.map.zoom }} 
                  width={ window.innerWidth }
                  height={ window.innerHeight * 0.8 }
                >
                  <Placemark 
                    onDragEnd = { this.getGps }
                    geometry={ [ this.props.coords.latitude, this.props.coords.longitude ] }
                    options={{ preset: 'islands#dotIcon', iconColor: 'green', draggable: true  }}
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
                  <FullscreenControl />
                </Map>
              </YMaps>
            </div>

            <ul class="list-group list-group-flush">
                
                <input type="checkbox" name="CheckBoxInputName" value="Value1" id="CheckBox1" checked />
                <label class="list-group-item w-100" for="CheckBox1">Авто-определение</label>

                <label for="formControlRange">Радиус круга</label>
                <input type="range" class="form-control-range" id="formControlRange" min="0" max="100" />
                
              <li class="list-group-item text-white bg-secondary">8-800-555-35-35</li>
            </ul>

          </div>

        </div>
      ) 
    : (
      <div>Получение геоданных&hellip; </div>
    );
  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  watchPosition: true,
  userDecisionTimeout: 5000,
})(Admin);

/*

              <li class="list-group-item">
                <form onSubmit={this.getGps}>
                  <button class="btn btn-light">Обновить позицию</button>
                </form>
              </li>


*/