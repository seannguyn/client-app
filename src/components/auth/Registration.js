import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux';
import {connect} from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import {notifyUser} from '../../action/notifyAction';
import Alert from '../layout/Alert';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password_confirm: "",
        }
        this.props.notifyUser(null,null);
        
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    matchPassword() {
        const {password, password_confirm} = this.state;
        const {notifyUser} = this.props;
        if (password === password_confirm) {
            return true;
        } else {
            notifyUser('Password do not match', 'error');
            return false;
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { firebase, notifyUser } = this.props;
        const { email, password } = this.state;
        
        if (this.matchPassword() === true) {
            firebase
            .createUser({
            email,
            password
            })
            .catch(err => {
                notifyUser('User already existed ', 'error');
            })
        }
        
    }

    render() {
        const {message, messageType} = this.props.notify;

        return (
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            {message !== null ? <Alert message={message} messageType={messageType}/> : null}
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock"></i>{' '}
                                    Login
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password Confirmation</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password_confirm"
                                        required
                                        value={this.state.password_confirm}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <input
                                type="submit"
                                value="Register & Login"
                                className="btn btn-primary btn-block"
                                />
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Registration.propTypes = {
    firebase: PropTypes.object.isRequired,
}

export default compose(
    firebaseConnect(),
    connect((state, props) =>({
        notify: state.notify,
        setting: state.settings.setting
    }),{notifyUser})
)(Registration);
