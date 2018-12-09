import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class AddClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            balance: "",
        }
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const newClient = this.state;

        const {firestore} = this.props;

        // If no balance, make 0
        if (newClient.balance === '') {
            newClient.balance = 0;
        }

        firestore.add({collection: 'clients'},newClient).then(this.props.closeModal);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {balanceOnAdd} = this.props.setting;
        return (
        <div style={{heigh:'1000px', width:'500px'}}>
            
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.firstName}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    minLength="2"
                    required
                    onChange={this.onChange}
                    value={this.state.lastName}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                    type="text"
                    className="form-control"
                    name="phone"
                    minLength="10"
                    required
                    onChange={this.onChange}
                    value={this.state.phone}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="balance">Balance</label>
                    <input
                    type="text"
                    className="form-control"
                    name="balance"
                    onChange={this.onChange}
                    value={this.state.balance}
                    disabled={!!balanceOnAdd}
                    />
                </div>

                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary btn-block"
                />
                <button onClick={this.props.closeModal} type="button" className="btn btn-secondary btn-block">Cancel</button>
            </form>
        </div>
        )
    }
}

export default compose(
    firestoreConnect(),
    connect((state,props) => ({
        setting: state.settings.setting
    }))
)(AddClient);


AddClient.propTypes ={
    firestore: PropTypes.object.isRequired
}
