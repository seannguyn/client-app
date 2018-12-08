import React, { Component } from 'react'
import { firestoreConnect } from 'react-redux-firebase';

class EditClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            balance: "",
        }
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }

    onSubmit(e) {
        e.preventDefault();
        
        
        const {firestore, client} = this.props;

        const newClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value,
        }
        firestore.update({ collection: 'clients', doc: client.id }, newClient).then(this.props.closeModal);
    }

    // onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {client} = this.props;
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
                        ref={this.firstNameInput}
                        defaultValue={client.firstName}
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
                        ref={this.lastNameInput}
                        defaultValue={client.lastName}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        type="email"
                        className="form-control"
                        name="email"
                        ref={this.emailInput}
                        defaultValue={client.email}
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
                        ref={this.phoneInput}
                        defaultValue={client.phone}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="balance">Balance</label>
                        <input
                        type="text"
                        className="form-control"
                        name="balance"
                        ref={this.balanceInput}
                        defaultValue={client.balance}
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

export default firestoreConnect()(EditClient);
