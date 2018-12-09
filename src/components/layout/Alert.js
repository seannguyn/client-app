import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types'

export default function Alert(props) {
    const {message, messageType} = props;
    return (
        <div className={classnames('alert',{
            'alert-danger': messageType === 'error',
            'alert-success': messageType === 'success'
        })}>
            {message}
            
        </div>
    )
}

Alert.propsTypes = {
    message: PropTypes.string.isRequired,
    messageType: PropTypes.string.isRequired,
}

