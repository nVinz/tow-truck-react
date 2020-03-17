import React from 'react';
import { geolocated } from "react-geolocated";
import '../App.css';

class Admin extends React.Component {

  componentDidMount() {
    this.getCoords();
    this.interval = setInterval(() => {
      this.getCoords();
    }, 5000);
  }

  getCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        /*console.log(position.coords.latitude);
        console.log(position.coords.longitude);*/
        fetch('https://tow-truck-spring.herokuapp.com/getData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude
          })
        });
      })
    }
    else {
      alert("Geolocation is disabled");
      }
  }

  render() {
    return (
        <div className="container d-flex h-100 w-100 justify-content-center">
          <div className="card h-100">

            <div className="card-header">Эвакуатор (админ-панель)</div>


            <ul className="list-group list-group-flush">

              <li className="list-group-item text-white bg-success">
                Трекинг включен
              </li>

              <li className="list-group-item">8-800-555-35-35</li>
            </ul>

          </div>

        </div>
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