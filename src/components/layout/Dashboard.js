import React, { Component } from 'react'
import Client from '../client/Client';
import AddClient from '../client/AddClient';
import Modal from 'react-modal';

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

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('el')

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
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


  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-10">
              <Client/>
          </div>
          <div className="col-md-2">
              <button className="btn btn-success" onClick={this.openModal}>
                <i className="fas fa-plus"/>New
              </button>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <AddClient closeModal={this.closeModal}/>
          
        </Modal>
        
      </div>
    )
  }
  
}

export default Dashboard;

