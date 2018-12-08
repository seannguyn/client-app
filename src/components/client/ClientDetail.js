import React, { Component } from 'react'
// import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {compose} from 'redux';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Modal from 'react-modal';
import EditClient from './EditClient';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ClientDetail extends Component {

  constructor(props) {    
    super(props);
    this.state = {
      showEditBalance: false,
      balanceUpdateAmount: 0,
      modalIsOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  onDeleteClick() {
    const {firestore, history, client} = this.props;

    firestore
    .delete({collection: 'clients', doc: client.id})
    .then(history.push('/'));;
  }

  onSubmit(e) {
    e.preventDefault();
    
    const clientUpdate = {
      balance: this.state.balanceUpdateAmount
    }

    this.props.firestore.update({collection: 'clients', doc: this.props.client.id}, clientUpdate);
    this.setState({showEditBalance: false})
  }

  onChange(e) {
    this.setState({[e.target.name]: [e.target.value]})
  }

  render() {
    const balanceForm = (
      <form onSubmit={this.onSubmit.bind(this)}>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="balanceUpdateAmount"
              placeholder="Add New Balance"
              value={this.state.balanceUpdateAmount}
              onChange={this.onChange.bind(this)}
            />
            <div className="input-group-append">
              <input
                type="submit"
                value="Update"
                className="btn btn-outline-dark"
              />
            </div>
          </div>
        </form>

    );

    const {client} = this.props;
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                <i className="fas fa-arrow-circle-left" /> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                
                <button className="btn btn-dark" onClick={this.openModal}>Edit</button>
                <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
            
            
          </div>
          <div className="card">
            <h3 className="card-header">
                {client.firstName} {client.lastName}
            </h3>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>Client ID: {' '} <span className="text-secondary">{client.id}</span></h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance: {'  '}
                    <span className={classnames({
                      'text-danger': client.balance > 0,
                      'text-success': client.balance <= 0
                    })}>${parseFloat(client.balance.toString()).toFixed(2)}
                    </span>{'  '}
                    <span><i className="fas fa-pencil-alt" onClick={() => {this.setState({showEditBalance: !this.state.showEditBalance, balanceUpdateAmount: client.balance})}}></i></span>
                    
                  </h3> 
                  {this.state.showEditBalance === true ? balanceForm : null}
                  
                  {/* add form */}
                </div>
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                  Phone: <span className="text-secondary">{client.phone}</span> 
                </li>
                <li className="list-group-item">
                  Email: <span className="text-secondary">{client.email}</span> 
                </li>
              </ul>
            </div>
          </div>
          <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          >
            <EditClient closeModal={this.closeModal} client={this.props.client}/>
          </Modal>
        </div>
      )
    } else {
      return (
          <div>
            loading
          </div>
        )
    }
    
  }
}

ClientDetail.propstypes= {
  firestore: PropTypes.object.isRequired,
}

 export default compose(
    firestoreConnect(props => [{ collection: 'clients', storeAs: 'client', doc: props.match.params.id}]),
    connect(({firestore:{ordered }}, props) => ({
      client: ordered.client && ordered.client[0]
    }))
)(ClientDetail);
