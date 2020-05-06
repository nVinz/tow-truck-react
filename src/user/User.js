import React from 'react';
import { YMaps, Map, Placemark, Circle, TrafficControl, ZoomControl, FullscreenControl } from 'react-yandex-maps';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";

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
      <div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">Эвакуатор в <b>Москве</b></div>
      </nav>
      
        <div className="container">
          <div className="card-deck">

            <div className="card m-3 h-25">
              <div className="card-header text-center h4"><b>Контакты</b></div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="card-body p-1">
                      <a href="tel:+89017309596">8 (901) 730-95-96</a><br />
                      <b>Илья</b>
                    </div>
                  </li>
                </ul>
            </div>

            <div className="card m-3 h-50">
              <div className="card-header text-center h4"><b>Фото</b></div>
                <div className="row">
                  <div className="col-md-12 px-0 w-100">
                    <MDBContainer>
                          <MDBCarousel
                            activeItem={1}
                            length={4}
                            showControls={true}
                            showIndicators={false}
                            className="z-depth-1"
                            slide
                          >
                            <MDBCarouselInner>
                              <MDBCarouselItem itemId="1">
                                <MDBView>
                                  <img
                                    className="d-block w-100"
                                    src="1.jpg"
                                    alt="First slide"
                                  />
                                </MDBView>
                              </MDBCarouselItem>
                              <MDBCarouselItem itemId="2">
                                <MDBView>
                                  <img
                                    className="d-block w-100"
                                    src="2.jpg"
                                    alt="Second slide"
                                  />
                                </MDBView>
                              </MDBCarouselItem>
                              <MDBCarouselItem itemId="3">
                                <MDBView>
                                  <img
                                    className="d-block w-100"
                                    src="3.jpg"
                                    alt="Third slide"
                                  />
                                </MDBView>
                              </MDBCarouselItem>
                              <MDBCarouselItem itemId="4">
                                <MDBView>
                                  <img
                                    className="d-block w-100"
                                    src="4.jpg"
                                    alt="4 slide"
                                  />
                                </MDBView>
                              </MDBCarouselItem>
                            </MDBCarouselInner>
                          </MDBCarousel>
                        </MDBContainer>
                </div>
              </div>
            </div>

            <div className="card m-3">
              <div className="card-header text-center h4"><b>Расположение</b></div>
                    <div className="media">
                      {this.state.latitude === 0 &&
                        <div className="container justify-content-center">
                          <div className="spinner-grow text-secondary m-5 p-5" role="status"><span className="sr-only">Loading...</span></div>
                        </div>
                      } 
                      {this.state.latitude !== 0 &&
                        <YMaps>
                          <Map 
                            defaultState={{ center: [this.state.latitude, this.state.longitude], zoom: cfg.map.zoom }}
                            width={ window.innerWidth * 0.8 }
                            height={ window.innerHeight * 0.8 }
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
                      }
                    </div>
              <div className="card-footer text-muted pb-3" style={{'lineHeight': 0 + 'px'}}> 
                <font size="3">by <a className="text-muted" href="https://vk.com/shelepukhin">nVinz</a></font> 
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default User;