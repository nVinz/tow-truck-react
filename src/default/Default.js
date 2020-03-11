import React from 'react';
import '../App.css';

class Default extends React.Component {

  render() {
    return(
        <div class="container d-flex h-100 w-100 justify-content-center">
          <div class="card h-100 bg-danger">

            <div class="card-header">Эвакуатор</div>


            <ul class="list-group list-group-flush">
              <li class="list-group-item bg-danger text-white">Геолокация недоступна или отключена</li>
              <li class="list-group-item bg-danger text-white">8-800-555-35-35</li>
            </ul>

          </div>

        </div>
      );
  }
}

export default Default;