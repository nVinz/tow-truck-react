import React from 'react';
import '../App.css';

class Admin extends React.Component {

  componentDidMount() {
    this.getCoords();
    this.interval = setInterval(() => {
      this.getCoords();
    }, 30000);
  }

  getCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
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

              {navigator.geolocation ?
                <div>
                  <li className="list-group-item text-white bg-danger">
                    Трекинг выключен
                  </li>
                  <li className="list-group-item text-white bg-danger">
                    Разрешите использовать геолокацию
                  </li>
                </div>
              :
                <div>
                  <li className="list-group-item text-white bg-success">
                    Трекинг включен
                  </li>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-grow text-success m-1 p-1" role="status"><span className="sr-only">Tracking...</span></div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary btn-lg btn-block mw-100" onClick={this.getCoords}>Обновить вручную</button>
                  </div>
                </div>
              }

              <div className="card-footer text-muted" style={{'lineHeight': 0 + 'px'}}> 
                <font size="3">by <a className="text-muted" href="https://vk.com/shelepukhin">nVinz</a></font> 
              </div>
            </ul>

          </div>

        </div>
      );
  }
}

export default Admin;