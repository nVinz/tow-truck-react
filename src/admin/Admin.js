import React from 'react';
import { geolocated } from "react-geolocated";
import '../App.css';

class Admin extends React.Component {

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
    /*if (navigator.geolocation) {
      console.log('Geolocation is supported!');

      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
      })
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }*/
    
    /*if (this.props.coords != null) {
      console.log(this.props.coords.latitude);
      console.log(this.props.coords.longitude);
      fetch('http://127.0.0.1:8080/getData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          latitude: this.props.coords.latitude,
          longtitude: this.props.coords.longitude
        })
      });
    }*/

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        fetch('http://10.8.80.32:8080/getData', {
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
    const loc = navigator.geolocation ? <section>Geolocation enabled</section> : <section>Geolocation disabled</section>;
    
    

    navigator.geolocation.getCurrentPosition(
      function(position) {
           alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
      },
      function(error){
           alert(error.message);
      }, {
           enableHighAccuracy: true
                ,timeout : 5000
      }
  );


    
    return (
        <div class="container d-flex h-100 w-100 justify-content-center">
          <div class="card h-100">

            <div class="card-header">Эвакуатор (админ-панель)</div>


            <ul class="list-group list-group-flush">

              <li class="list-group-item">
                {loc}
              </li>

              <li class="list-group-item text-white bg-success">
                Трекинг включен
              </li>

              <li class="list-group-item">8-800-555-35-35</li>
            </ul>

          </div>

        </div>
      );
  }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  watchPosition: true,
  userDecisionTimeout: 5000,
})(Admin);

/*


              <li class="list-group-item">
                <form onSubmit={this.getCoords}>
                  <button class="btn btn-light">Обновить позицию</button>
                </form>
              </li>

*/