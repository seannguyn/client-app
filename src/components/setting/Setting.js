import React, { Component } from 'react'
import { connect } from 'react-redux';
import {setBalanceOnAdd, setBalanceOnEdit, setAllowRegistration} from '../../action/settingAction'
import { Link } from 'react-router-dom';

class Setting extends Component {

    state={
        setting: {}
    }

    setBalanceOnAdd() {
        this.props.setBalanceOnAdd();
    }

    setBalanceOnEdit() {
        this.props.setBalanceOnEdit();
    }

    setAllowRegistration() {
        this.props.setAllowRegistration();
    }

    render() {
    const {balanceOnAdd,balanceOnEdit,allowRegistration} = this.props.setting;
    
        return (
        <div>
            <div className="row">
                <div className="col-md-6">
                <Link to="/" className="btn btn-link">
                    <i className="fas fa-arrow-circle-left" /> Back To Dashboard
                </Link>
                </div>
            </div>
            <div className="card">
            <div className="card-header">Edit Settings</div>
            <div className="card-body">
                <form>
                <div className="form-group">
                    <label>Allow Registration</label>{' '}
                    <input
                    type="checkbox"
                    name="allowRegistration"
                    checked={!!allowRegistration}
                    onChange={this.setAllowRegistration.bind(this)}
                    />
                </div>

                <div className="form-group">
                    <label>Disable Balance On Add</label>{' '}
                    <input
                    type="checkbox"
                    name="disableBalanceOnAdd"
                    checked={!!balanceOnAdd}
                    onChange={this.setBalanceOnAdd.bind(this)}
                    />
                </div>

                <div className="form-group">
                    <label>Disable Balance On Edit</label>{' '}
                    <input
                    type="checkbox"
                    name="disableBalanceOnEdit"
                    checked={!!balanceOnEdit}
                    onChange={this.setBalanceOnEdit.bind(this)}
                    />
                </div>
                </form>
            </div>
            </div>
        </div>
        )
    }
}

export default connect((state, props) => ({
    auth: state.firebase.auth,
    setting: state.settings.setting
}),{setBalanceOnAdd, setBalanceOnEdit, setAllowRegistration})(Setting);
