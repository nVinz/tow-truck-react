import React from 'react';
import './App.css';
import User from './user/User'
import Admin from './admin/Admin'
import { Route } from 'react-router-dom'


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={User}/>
        <Route exact path="/admin" component={Admin}/>
      </div>
    );
  }
}

export default App;
// https://coolors.co/2b2d42-8d99ae-edf2f4-ef233c-d90429