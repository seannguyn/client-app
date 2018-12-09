import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {compose} from 'redux';
import {connect} from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types'

class AppNavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    }
  }

  // this method is equivalent to component will receive props
  static getDerivedStateFromProps(nextProps, prevState) {
    const { auth } = nextProps;

    if (auth.isEmpty !== true) {
      return {isAuthenticated: true}
    } else {
      return {isAuthenticated: false}
    }
  }

  logout() {
    const {firebase} = this.props;
    firebase.logout();
    this.setState({isAuthenticated: false})
  }

  render() {
    const {isAuthenticated} = this.state;
    const {auth} = this.props
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button className="navbar-toggler" type="button" data-collapse="#navbarMain" data-toggle="collapse">
            <span className="navbar-toggler-icon">
            </span>
          </button>

          <div className="navbar navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated === true ? (
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Dashboard</Link>
                  </li>
                ) : null}
            </ul>

            {isAuthenticated === true ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">{auth.email}</a>
                </li>
                <li className="nav-item">
                  <Link to="/setting" className="nav-link">
                    Setting
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="#!" className="nav-link" onClick={this.logout.bind(this)}>Logout</a>
                </li>
              </ul>
              ) : 
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            }
          
            
          </div>
        </div>
      </nav>
    )
  }
}

AppNavBar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

export default compose(
  firebaseConnect(),
  connect((state,props) => ({
    auth: state.firebase.auth
  })),
)(AppNavBar);
