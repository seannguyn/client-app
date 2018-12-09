import React, { Component } from 'react';
import './App.css';
import AppNavBar from './components/layout/AppNavBar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './components/layout/Dashboard';
import {Provider} from 'react-redux';
import store from './store';
import ClientDetail from './components/client/ClientDetail';
import Login from './components/auth/Login';
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth';
import Setting from './components/setting/Setting';
import Registration from './components/auth/Registration';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavBar/>
            <div className="container">
              <Switch>
                <Route exact path="/" component={UserIsAuthenticated(Dashboard)}/>
                <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetail)}/>
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
                <Route exact path="/setting" component={UserIsAuthenticated(Setting)}/>
                <Route exact path="/register" component={UserIsNotAuthenticated(Registration)}/>
              </Switch>
            </div>
          </div> 
        </Router>
      </Provider>
    );
  }
}

export default App;

// okk
