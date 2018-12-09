import {NOTIFY_USER} from '../action/type';


export const notifyUser = (message, messageType) => {
    return {
        type:NOTIFY_USER,
        message,
        messageType,
    }
}