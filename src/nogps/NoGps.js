import React from 'react';
import { YMaps, Map, Placemark, Circle, TrafficControl, ZoomControl, FullscreenControl } from 'react-yandex-maps';
import '../App.css';

class NoGps extends React.Component {
    state = {
        latitude:  undefined,
        longitude:     undefined
    }

    setPointer = async (e) => {
        e.preventDefault();
        this.setState({
            latitude:  1,
            longitude:     undefined
        });
        console.log(e);
        console.log(e.originalEvent.position);
        console.log(e.originalEvent.target.geometry._coordinates);
    }

    render() {

        var gps = require('../data/gps.json');
        var cfg = require('../data/cfg.json');

        var latitude, longitude;

        const writeFileP = require("write-file-p");
        writeFileP('../data/test.json', "Hello World", (err, data) => {
            console.log(err || data);
        });
        
        return(
            <div class="container d-flex h-100 w-100 justify-content-center">
            <div class="card h-100 text-white bg-secondary">

                <div class="card-header">Админ-панель</div>

                <div class="media">
                <YMaps>
                    <Map 
                    defaultState={{ center: [gps.latitude, gps.longitude], zoom: cfg.map.zoom }} 
                    width={ window.innerWidth }
                    height={ window.innerHeight * 0.8 }
                    >
                    <Placemark 
                        onDragEnd = { this.setPointer }
                        geometry={ [ gps.latitude, gps.longitude ] }
                        options={{ preset: 'islands#dotIcon', iconColor: 'green', draggable: true  }}
                    />
                    <Circle 
                        options={{fillColor: cfg.circle.color.fill + cfg.circle.color.fillAlpha, 
                                strokeColor: cfg.circle.color.stroke + cfg.circle.color.strokeAlpha,
                                fillOpacity: cfg.circle.fillOpacity, 
                                outline: true }}
                        geometry={ [ [gps.latitude, gps.longitude], cfg.circle.radius] }
                    />
                    <TrafficControl />
                    <ZoomControl />
                    <FullscreenControl />
                    </Map>
                </YMaps>
                </div>

                <ul class="list-group list-group-flush">
                    
                    <section><input type="checkbox" name="CheckBoxInputName" value="Value1" id="CheckBox1" disabled/>
                    <label class="list-group-item w-100" for="CheckBox1">Авто-определение недоступно</label></section> 
    
                    <input type="checkbox" name="CheckBoxInputName" value="Value1" id="CheckBox2" />
                    <label class="list-group-item w-100" for="CheckBox2">Авто-определение 2</label>
    
                <li class="list-group-item text-white bg-secondary">8-800-555-35-35</li>
                </ul>

            </div>

            </div>
        );
    }
}

export default NoGps;
