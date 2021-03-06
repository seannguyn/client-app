import {NOTIFY_USER} from '../action/type';

const initialSate={
    message: null,
    messageType: null
}
export default function (state = initialSate, action) {
    switch(action.type) {
        case NOTIFY_USER:
            return {
                ...state, 
                message: action.message,
                messageType: action.messageType
            }
        default:
            return {
                ...state
            }
    }
}